import invariant from "tiny-invariant";
import { BOOKMARKS_URL, COLLECTION_URL } from "./constants";
import type {
  CollectionResponse,
  RainDropItem,
  RainDropResponse,
} from "./model";

export class BookmarkService {
  constructor(private token: string) {
    invariant(token !== undefined, "Missing bookmark service token.");
    invariant(token.length > 1, "Missing bookmark service token.");
  }

  public async traverseAllBookmarks(
    callback: (
      page: RainDropItem[],
      pagination: { page: number; pageCount: number }
    ) => Promise<void>
  ) {
    const perPage = 20;
    const pageCount = await this.fetchPageCount(perPage);
    let currentPage = 0;
    while (currentPage < pageCount) {
      const page = await this.fetchBookmarks({ perPage, page: currentPage });
      await callback(page, { page: currentPage, pageCount });
      currentPage++;
    }
  }

  private async fetchPageCount(perPage: number) {
    const {
      item: { count },
    } = await fetch(COLLECTION_URL, { headers: this.headers }).then(
      response => {
        invariant(
          response.ok,
          `Received error fetching paging info. ${response.statusText}`
        );
        invariant(
          response.body !== null,
          "No body returned while fetching paging info."
        );
        return response.json() as Promise<CollectionResponse>;
      }
    );
    return Math.ceil(count / perPage);
  }

  private async fetchBookmarks({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }) {
    invariant(page >= 0, "A negative page requested");
    invariant(perPage > 0, "A negative page size requested");
    const url = new URL(BOOKMARKS_URL);
    url.search = new URLSearchParams({
      perpage: String(perPage),
      page: String(page),
    }).toString();
    // ideally, we'd just use the URL object here, but that blows up msw during testing.
    // but using the href is identical behavior
    const { items } = await fetch(url.href, { headers: this.headers }).then(
      response => {
        invariant(
          response.ok,
          `Received error fetching bookmarks. ${response.statusText}`
        );
        invariant(
          response.body !== null,
          "No response body return while fetching bookmarks."
        );
        return response.json() as Promise<RainDropResponse>;
      }
    );
    invariant(items.length > 0, "No bookmarks returned.");
    return items;
  }

  private get headers() {
    return new Headers({ Authorization: `Bearer ${this.token}` });
  }
}
