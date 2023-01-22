import invariant from "tiny-invariant";

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
const LAST_TEN_BOOKMARKS_URL = new URL(
  `/rest/v1/raindrops/${PUBLIC_COLLECTION_ID}?perpage=10&sort=-created`,
  RAINDROP_DOMAIN
);

export async function getRecentBookmarks() {
  const { RAINDROP_TOKEN } = process.env;
  invariant(
    typeof RAINDROP_TOKEN === "string",
    "Missing RAINDROP_TOKEN env variable."
  );
  const headers = new Headers({ Authorization: `Bearer ${RAINDROP_TOKEN}` });
  return fetch(LAST_TEN_BOOKMARKS_URL, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Received error from raindrop: ${response.statusText}`
        );
      } else if (response.body === null) {
        throw new Error("No response from raindrop.");
      }
      return response.json() as Promise<RainDropResponse>;
    })
    .then(({ items }) => items);
}
