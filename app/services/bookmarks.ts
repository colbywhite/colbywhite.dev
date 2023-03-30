import invariant from "tiny-invariant";
import { OutOfBoundsError } from "~/utils";
import { KvCache } from "~/services/kv.cache";

// TODO validate response schema
interface RainDropResponse {
  items: {
    title: string;
    link: string;
    created: string;
    domain: string;
    _id: number;
  }[];
  count: number;
}

// This is the collection on raindrop.io that contains the public bookmarks.
const PUBLIC_COLLECTION_ID = 30789544;
const RAINDROP_DOMAIN = "https://api.raindrop.io";
const BOOKMARKS_URL = new URL(
  `/rest/v1/raindrops/${PUBLIC_COLLECTION_ID}`,
  RAINDROP_DOMAIN
);
const DEFAULT_OPTIONS = { page: 0, perPage: 10, sort: "-created" };
type Options = typeof DEFAULT_OPTIONS;

export class BookmarkService {
  constructor(private token: string, private kv: KvCache) {
    invariant(token.length > 1, "Missing bookmark service token.");
    invariant(kv !== undefined, "Missing kv cache.");
  }

  public getRecentBookmarks(count: number = 10) {
    return this.getBookmarks({
      page: 0,
      perPage: count,
      sort: "-created",
    }).then(({ bookmarks }) => bookmarks);
  }

  public getBookmarks(options: Partial<Options> = DEFAULT_OPTIONS) {
    const parsedOptions = { ...DEFAULT_OPTIONS, ...options };
    const key = `bookmarks:page${parsedOptions.page}:perPage${parsedOptions.perPage}:sort${parsedOptions.sort}`;
    return this.kv.fetchIfNotInCache(key, () =>
      this.fetchBookmarks(parsedOptions)
    );
  }

  private fetchBookmarks(options: Options = DEFAULT_OPTIONS) {
    const headers = this.getAuthHeaders();
    const url = new URL(BOOKMARKS_URL);
    url.search = new URLSearchParams({
      sort: options.sort,
      perpage: String(options.perPage),
      page: String(Math.max(0, options.page)),
    }).toString();
    return fetch(url, { headers })
      .then((response) => {
        invariant(response.ok, "Received error from raindrop.");
        invariant(response.body !== null, "No response from raindrop.");
        return response.json() as Promise<RainDropResponse>;
      })
      .then(({ items, count }) => {
        const pagingResults = this.calculatePaging(count, options);
        if (pagingResults.numPages <= pagingResults.currentPage) {
          throw new OutOfBoundsError(
            pagingResults.numPages - 1,
            `Cannot find page ${options.page + 1}; there are only ${
              pagingResults.numPages
            } pages.`
          );
        }
        invariant(items.length > 0, "No bookmarks returned.");
        return { bookmarks: items, paging: pagingResults };
      });
  }

  private calculatePaging(count: number, { perPage, page }: Options) {
    const numPages = Math.ceil(count / perPage);
    const lastPage = numPages - 1; // minus 1 since page is zero-indexed
    const firstPage = 0;
    const possibleNextPage = page + 1;
    const possiblePreviousPage = page - 1;
    return {
      numPages,
      perPage,
      totalItems: count,
      currentPage: Math.min(lastPage, Math.max(firstPage, page)),
      nextPage: possibleNextPage <= lastPage ? possibleNextPage : undefined,
      previousPage:
        possiblePreviousPage >= firstPage ? possiblePreviousPage : undefined,
    };
  }

  private getAuthHeaders() {
    return new Headers({ Authorization: `Bearer ${this.token}` });
  }
}
