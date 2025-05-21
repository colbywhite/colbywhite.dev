import type { Loader, LoaderContext } from "astro/loaders";
import { BookmarkService } from "./service";
import { RainDropItemSchema } from "./model";

const LAST_UPDATE_KEY = "lastUpdate" as const;

function shouldSyncBookmarks(
  storeUpdate: Date | undefined,
  bookmarkUpdate: Date | undefined
) {
  return (
    storeUpdate === undefined ||
    bookmarkUpdate === undefined ||
    storeUpdate < bookmarkUpdate
  );
}

export default function ({ token }: { token: string }): Loader {
  const bookmarkSvc = new BookmarkService(token);
  return {
    name: "bookmarks",
    load: async ({
      store,
      parseData,
      generateDigest,
      logger,
      meta,
    }: LoaderContext): Promise<void> => {
      const lastStoreUpdateStr = meta.get(LAST_UPDATE_KEY);
      const lastStoreUpdate = lastStoreUpdateStr
        ? new Date(lastStoreUpdateStr)
        : undefined;
      const lastBookmarkUpdate = await bookmarkSvc.getLastUpdated();
      logger.debug(
        `Metadata: {lastStoreUpdate: ${lastStoreUpdate?.toISOString()}}, lastBookmarkUpdate: ${lastBookmarkUpdate?.toISOString()}}`
      );
      // Only run the sync if we're out of date.
      // In practice, this only speeds up local development since Raindrop doesn't support filtering by date.
      if (!shouldSyncBookmarks(lastStoreUpdate, lastBookmarkUpdate)) {
        logger.info("Store is up to date.");
        return;
      }
      logger.info("Traversing All.");
      let count = 0;
      await bookmarkSvc.traverseAllBookmarks(async (page, pagination) => {
        for (const bookmark of page) {
          const id = String(bookmark._id);
          const data = await parseData({ id, data: bookmark });
          const digest = generateDigest(data);
          if (store.set({ data, digest, id })) {
            count++;
          }
        }
        logger.debug(
          `Traversed page ${pagination.page + 1} of ${pagination.pageCount}.`
        );
      });
      meta.set(LAST_UPDATE_KEY, new Date().toISOString());
      logger.info(`Stored ${count}.`);
    },
    schema: RainDropItemSchema,
  };
}
