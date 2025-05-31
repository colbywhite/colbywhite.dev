import type { Loader, LoaderContext } from "astro/loaders";
import {
  type InkDropBlogPost,
  InkDropBlogPostSchema,
} from "@/content/blogPosts/model";
import { InkDropService } from "@/content/blogPosts/service";
import { changeToDataEntry } from "@/content/blogPosts/utils";

const LAST_SYNCED_SEQ_ID = "lastSeq" as const;
const NAME = "blogPosts";

export default function ({
  dbConfig,
  notebookId,
  force = false,
}: {
  dbConfig: {
    url: string;
    name: string;
    user: string;
    password: string;
  };
  notebookId: string;
  force?: boolean;
}): Loader {
  const isPublishedNote = (post: InkDropBlogPost) =>
    post.bookId === notebookId && post.status === "completed";

  return {
    name: NAME,
    load: async ({
      logger,
      meta,
      parseData,
      generateDigest,
      store,
    }: LoaderContext): Promise<void> => {
      if (force) {
        store.clear();
        meta.delete(LAST_SYNCED_SEQ_ID);
      }
      const lastSyncedSeq = meta.get(LAST_SYNCED_SEQ_ID);
      const inkDropSvc = await InkDropService.buildService(dbConfig);
      await inkDropSvc.traverseAllNoteChanges(lastSyncedSeq, async changes => {
        logger.debug(
          `Processing ${changes.length} changes since ${lastSyncedSeq}`
        );
        if (changes.length <= 0) {
          logger.info("Store is up to date.");
        } else {
          let count = 0;
          for (const change of changes) {
            logger.debug(`id: ${change.id} seq: ${change.seq}`);
            if (isPublishedNote(change.doc)) {
              const entry = await changeToDataEntry(change, {
                parseData,
                generateDigest,
              });
              if (store.set(entry)) {
                count++;
              }
            } else if (store.has(change.id)) {
              store.delete(change.id);
              count++;
            }
            meta.set(LAST_SYNCED_SEQ_ID, change.seq);
          }
          if (count > 0) {
            logger.info(`Updated ${count} ${NAME}.`);
          }
        }
      });
    },
    schema: InkDropBlogPostSchema,
  };
}
