import { describe, expect, it } from "vitest";
import { KvCache } from "~/services/kv.cache";
import { NetworkMocker } from "../../test/setup-test-env";
import { BookmarkService } from "~/services/bookmarks";

describe("BookmarkService", () => {
  const TOKEN = "TOKEN";
  const BOOKMARK = {
    _id: 550813277,
    title: "Prompt Engineering Shouldn't Exist",
    link: "https://matt-rickard.com/prompt-engineering-shouldnt-exist",
    created: "2023-04-04T17:55:20.820Z",
  };

  const PATH_URL = new URL(
    "https://api.raindrop.io/rest/v1/raindrops/30789544"
  );

  const STANDARD_PAGING = {
    currentPage: 0,
    nextPage: undefined,
    numPages: 1,
    perPage: 1,
    previousPage: undefined,
    totalItems: 1,
  };

  let network: NetworkMocker;
  let svc: BookmarkService;

  beforeEach(() => {
    network = new NetworkMocker(
      new Headers({ Authorization: `Bearer ${TOKEN}` })
    );
    svc = new BookmarkService(TOKEN, new KvCache(BOOKMARKS));
  });

  afterEach(() => {
    if (network) {
      network.cleanup();
    }
  });

  it("should return a page of bookmarks with default options", async () => {
    const expectedUrl = new URL(PATH_URL);
    expectedUrl.search = new URLSearchParams({
      sort: "-created",
      perpage: "10",
      page: "0",
    }).toString();
    network.json(expectedUrl, { items: [BOOKMARK], count: 1 });
    const bookmarks = await svc.getBookmarks();
    expect(bookmarks).toEqual({
      bookmarks: [BOOKMARK],
      paging: { ...STANDARD_PAGING, perPage: 10 },
    });
  });

  it("should return first page of bookmarks", async () => {
    const expectedUrl = new URL(PATH_URL);
    expectedUrl.search = new URLSearchParams({
      sort: "-created",
      perpage: "1",
      page: "0",
    }).toString();
    network.json(expectedUrl, { items: [BOOKMARK], count: 10 });
    const bookmarks = await svc.getBookmarks({ perPage: 1 });
    expect(bookmarks).toEqual({
      bookmarks: [BOOKMARK],
      paging: { ...STANDARD_PAGING, nextPage: 1, totalItems: 10, numPages: 10 },
    });
  });

  it("should return middle page of bookmarks", async () => {
    const url = new URL(PATH_URL);
    url.search = new URLSearchParams({
      sort: "-created",
      perpage: "1",
      page: "4",
    }).toString();
    network.json(url, { items: [BOOKMARK], count: 10 });
    const bookmarks = await svc.getBookmarks({ perPage: 1, page: 4 });
    expect(bookmarks).toEqual({
      bookmarks: [BOOKMARK],
      paging: {
        ...STANDARD_PAGING,
        nextPage: 5,
        previousPage: 3,
        currentPage: 4,
        totalItems: 10,
        numPages: 10,
      },
    });
  });

  it("should return last page of bookmarks", async () => {
    const url = new URL(PATH_URL);
    url.search = new URLSearchParams({
      sort: "-created",
      perpage: "1",
      page: "9",
    }).toString();
    network.json(url, { items: [BOOKMARK], count: 10 });
    const bookmarks = await svc.getBookmarks({ perPage: 1, page: 9 });
    expect(bookmarks).toEqual({
      bookmarks: [BOOKMARK],
      paging: {
        ...STANDARD_PAGING,
        perPage: 1,
        previousPage: 8,
        currentPage: 9,
        totalItems: 10,
        numPages: 10,
      },
    });
  });
});
