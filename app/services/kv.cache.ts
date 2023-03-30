import invariant from "tiny-invariant";

const FIFTEEN_MINUTES_IN_SECONDS = 900;

export class KvCache {
  constructor(private kv: KVNamespace) {
    invariant(kv !== undefined, "Missing kv namespace.");
  }

  public async fetchIfNotInCache<T>(
    key: string,
    dataFetcher: () => Promise<T>
  ) {
    const cached = await this.kv.get(key, "text");
    if (cached) {
      console.log("KvCache", "🎯", key);
      return JSON.parse(cached) as T;
    }
    console.log("KvCache", "🐌", key);
    const fresh = await dataFetcher();
    await this.kv.put(key, JSON.stringify(fresh), {
      expirationTtl: FIFTEEN_MINUTES_IN_SECONDS,
    });
    return fresh;
  }
}
