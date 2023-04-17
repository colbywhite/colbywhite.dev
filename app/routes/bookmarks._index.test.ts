import { describe, it, expect } from "vitest";
import { loader } from "~/routes/bookmarks._index";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { OutOfBoundsError } from "~/utils";
import { redirect } from "@remix-run/router";
import type { BookmarkService } from "~/services/bookmarks";

function url(
  origin: string,
  params?: string[][] | Record<string, string> | string
) {
  const url = new URL(origin);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }
  return url;
}

const TEST_ORIGIN = "https://test.io";
const STANDARD_LOADER_ARGS: LoaderArgs = {
  params: {},
  request: new Request(url(TEST_ORIGIN)),
  context: { services: { bookmark: undefined } },
};

const BOOKMARK = {
  _id: 550813277,
  title: "Prompt Engineering Shouldn't Exist",
  link: "https://matt-rickard.com/prompt-engineering-shouldnt-exist",
  created: "2023-04-04T17:55:20.820Z",
};

const FIRST_PAGE_PAGING: Awaited<
  ReturnType<typeof BookmarkService.prototype.getBookmarks>
>["paging"] = {
  numPages: 5,
  perPage: 25,
  totalItems: 101,
  currentPage: 0,
  nextPage: 1,
  previousPage: undefined,
};

describe("/bookmarks", () => {
  it("should redirect on negative pages", async () => {
    const givenUrl = url(TEST_ORIGIN, { p: "-1" });
    const expectedUrl = url(givenUrl.origin, { p: "1" });
    const response = loader({
      ...STANDARD_LOADER_ARGS,
      request: new Request(givenUrl),
    });
    await expect(response).rejects.toEqual(redirect(expectedUrl.href));
  });

  it("should redirect on page zero", async () => {
    const givenUrl = url(TEST_ORIGIN, { p: "0" });
    const expectedUrl = url(givenUrl.origin, { p: "1" });
    const response = loader({
      ...STANDARD_LOADER_ARGS,
      request: new Request(givenUrl),
    });
    await expect(response).rejects.toEqual(redirect(expectedUrl.href));
  });

  it("should redirect on OutOfBoundsError", async () => {
    const bookmarkSvc = {
      getBookmarks: vi.fn().mockRejectedValue(new OutOfBoundsError(4)),
    };
    const givenUrl = url(TEST_ORIGIN, { p: "10" });
    const expectedUrl = url(givenUrl.origin, { p: "5" });
    const response = loader({
      ...STANDARD_LOADER_ARGS,
      request: new Request(givenUrl),
      context: { services: { bookmark: bookmarkSvc } },
    });
    await expect(response).rejects.toEqual(redirect(expectedUrl.href));
    expect(bookmarkSvc.getBookmarks).toHaveBeenCalledOnce();
    expect(bookmarkSvc.getBookmarks).toHaveBeenCalledWith({
      page: 9,
      perPage: 25,
    });
  });

  it("should return first page of bookmarks when not given a page", async () => {
    const bookmarkSvc = {
      getBookmarks: vi.fn().mockResolvedValue({
        bookmarks: [BOOKMARK],
        paging: FIRST_PAGE_PAGING,
      }),
    };
    const response = await loader({
      ...STANDARD_LOADER_ARGS,
      context: { services: { bookmark: bookmarkSvc } },
    });
    expect(response.status).toEqual(200);
    expect(bookmarkSvc.getBookmarks).toHaveBeenCalledOnce();
    expect(bookmarkSvc.getBookmarks).toHaveBeenCalledWith({
      page: 0,
      perPage: 25,
    });
    const body = await response.json();
    expect(body).toEqual({ bookmarks: [BOOKMARK], paging: FIRST_PAGE_PAGING });
  });

  it("should return requested page of bookmarks", async () => {
    const givenUrl = url(TEST_ORIGIN, { p: "2" });
    const expectedPaging = {
      ...FIRST_PAGE_PAGING,
      currentPage: 1,
      nextPage: 2,
      previousPage: 0,
    };
    const bookmarkSvc = {
      getBookmarks: vi.fn().mockResolvedValue({
        bookmarks: [BOOKMARK],
        paging: expectedPaging,
      }),
    };
    const response = await loader({
      ...STANDARD_LOADER_ARGS,
      request: new Request(givenUrl),
      context: { services: { bookmark: bookmarkSvc } },
    });
    expect(response.status).toEqual(200);
    expect(bookmarkSvc.getBookmarks).toHaveBeenCalledOnce();
    expect(bookmarkSvc.getBookmarks).toHaveBeenCalledWith({
      page: 1,
      perPage: 25,
    });
    const body = await response.json();
    expect(body).toEqual({ bookmarks: [BOOKMARK], paging: expectedPaging });
  });
});
