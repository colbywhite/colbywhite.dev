// This is the collection on raindrop.io that contains the public bookmarks.
const PUBLIC_COLLECTION_ID = 30789544;
const RAINDROP_DOMAIN = "https://api.raindrop.io";
export const BOOKMARKS_URL = new URL(
  `/rest/v1/raindrops/${PUBLIC_COLLECTION_ID}`,
  RAINDROP_DOMAIN
);
export const COLLECTION_URL = new URL(
  `/rest/v1/collection/${PUBLIC_COLLECTION_ID}`,
  RAINDROP_DOMAIN
);
