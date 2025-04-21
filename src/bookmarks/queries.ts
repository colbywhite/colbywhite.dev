import { getCollection } from "astro:content";

const getSortedBookmarks = async () => {
  const bookmarks = await getCollection("bookmarks");
  return bookmarks.sort(
    (a, b) =>
      new Date(b.data.created).getTime() - new Date(a.data.created).getTime()
  );
};

const getRecentBookmarks = async (count = 10) => {
  const bookmarks = await getSortedBookmarks();
  return bookmarks.slice(0, count);
};

export { getSortedBookmarks, getRecentBookmarks };
