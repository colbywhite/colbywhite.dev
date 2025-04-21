import type { Loader, LoaderContext } from "astro/loaders";
import { BookmarkService } from "./service";
import { RainDropItemSchema } from "./model";

export default function ({ token }: { token: string }): Loader {
  const bookmarkSvc = new BookmarkService(token);
  return {
    name: "bookmarks",
    load: async ({
      store,
      parseData,
      generateDigest,
      logger,
    }: LoaderContext): Promise<void> => {
      // TODO only load when there are new bookmarks
      logger.info("Loading bookmarks");
      store.clear();
      await bookmarkSvc.traverseAllBookmarks(async page => {
        for (const bookmark of page) {
          const id = String(bookmark._id);
          const data = await parseData({ id, data: bookmark });
          const digest = generateDigest(data);
          store.set({ data, digest, id });
        }
        logger.info(`Stored ${page.length} bookmarks`);
      });
    },
    schema: RainDropItemSchema,
  };
}
