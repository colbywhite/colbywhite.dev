import invariant from "tiny-invariant";
import { OutOfBoundsError } from "~/utils";

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

function getAuthHeaders() {
  const { RAINDROP_TOKEN } = process.env;
  invariant(
    typeof RAINDROP_TOKEN === "string",
    "Missing RAINDROP_TOKEN env variable."
  );
  return new Headers({ Authorization: `Bearer ${RAINDROP_TOKEN}` });
}

export async function getBookmarks(
  options: Partial<Options> = DEFAULT_OPTIONS
) {
  const headers = getAuthHeaders();
  const parsedOptions = { ...DEFAULT_OPTIONS, ...options };
  const url = new URL(BOOKMARKS_URL);
  url.search = new URLSearchParams({
    sort: parsedOptions.sort,
    perpage: String(parsedOptions.perPage),
    page: String(Math.max(0, parsedOptions.page)),
  }).toString();
  return fetch(url, { headers })
    .then((response) => {
      invariant(response.ok, "Received error from raindrop.");
      invariant(response.body !== null, "No response from raindrop.");
      return response.json() as Promise<RainDropResponse>;
    })
    .then(({ items, count }) => {
      const pagingResults = calculatePagingResults(count, parsedOptions);
      if (pagingResults.numPages <= pagingResults.currentPage) {
        throw new OutOfBoundsError(
          pagingResults.numPages - 1,
          `Cannot find page ${parsedOptions.page + 1}; there are only ${
            pagingResults.numPages
          } pages.`
        );
      }
      invariant(items.length > 0, "No bookmarks returned.");
      return { bookmarks: items, paging: pagingResults };
    });
}

export async function getRecentBookmarks(count: number = 10) {
  return getBookmarks({ page: 0, perPage: count, sort: "-created" }).then(
    ({ bookmarks }) => bookmarks
  );
}

function calculatePagingResults(count: number, { perPage, page }: Options) {
  const numPages = Math.ceil(count / perPage);
  const nextPage = page + 1;
  return {
    numPages,
    perPage: perPage,
    totalItems: count,
    currentPage: page,
    nextPage: nextPage <= numPages - 1 ? nextPage : undefined, // minus 1 since page is zero-indexed
  };
}
