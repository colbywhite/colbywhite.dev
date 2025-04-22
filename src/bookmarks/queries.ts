import { getCollection } from "astro:content";
import { SITE } from "@/config";

const getSortedBookmarks = async () => {
  const bookmarks = await getCollection("bookmarks");
  return bookmarks.sort(
    (a, b) =>
      new Date(b.data.created).getTime() - new Date(a.data.created).getTime()
  );
};

const getRecentBookmarks = async (count = SITE.paging) => {
  const bookmarks = await getSortedBookmarks();
  return bookmarks.slice(0, count);
};

export { getSortedBookmarks, getRecentBookmarks };
