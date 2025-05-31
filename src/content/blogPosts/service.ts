import nano, { type DocumentScope, type DatabaseChangesResponse } from "nano";
import type {
  InkDropBlogPost,
  InkDropBlogPostChangeDocument,
} from "@/content/blogPosts/model";

export class InkDropService {
  constructor(private db: DocumentScope<InkDropBlogPost>) {}

  public async traverseAllNoteChanges(
    seqId: string | undefined,
    callback: (page: InkDropBlogPostChangeDocument[]) => Promise<void>
  ) {
    const perPage = 20;
    let lastSeq = seqId;
    let page: DatabaseChangesResponse = {
      last_seq: lastSeq,
      pending: Number.MAX_SAFE_INTEGER,
      results: [],
    };
    do {
      page = await this.db.changes({
        since: lastSeq,
        limit: perPage,
        include_docs: true,
      });
      lastSeq = page.last_seq;
      const filteredChanges = (
        page.results as InkDropBlogPostChangeDocument[]
      ).filter(change => change.id.startsWith("note:"));
      await callback(filteredChanges);
    } while (page.pending > 0);
  }

  static async buildService(config: {
    url: string;
    name: string;
    user: string;
    password: string;
  }) {
    const client = nano({ url: config.url, requestDefaults: { jar: true } });
    await client.auth(config.user, config.password);
    const db = client.db.use<InkDropBlogPost>(config.name);
    return new InkDropService(db);
  }
}
