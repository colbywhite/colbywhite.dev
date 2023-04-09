import { beforeEach, expect, it } from "vitest";
import { KvCache } from "~/services/kv.cache";

const describe = setupMiniflareIsolatedStorage();

describe("KvCache", () => {
  let cache: KvCache;

  beforeEach(() => {
    cache = new KvCache(BOOKMARKS);
  });

  it("should return data that is not cached and cache it for later requests", async () => {
    const cacheMissKey = "MISS";
    const cacheMissValue = "MISS_VALUE";
    const mockFetcher = vi.fn().mockResolvedValue(cacheMissValue);
    const result = await cache.fetchIfNotInCache(cacheMissKey, mockFetcher);
    expect(result).toBe(cacheMissValue);
    expect(mockFetcher).toHaveBeenCalledOnce();
    expect(await BOOKMARKS.get(cacheMissKey)).toEqual(
      JSON.stringify(cacheMissValue)
    );
  });

  it("should return data that is cached", async () => {
    const cacheHitKey = "HIT";
    const cacheHitValue = "HIT_VALUE";
    const cacheMissValue = "MISS_VALUE";
    await BOOKMARKS.put(cacheHitKey, JSON.stringify(cacheHitValue));
    const mockFetcher = vi.fn().mockResolvedValue(cacheMissValue);
    const result = await cache.fetchIfNotInCache(cacheHitKey, mockFetcher);
    expect(mockFetcher).not.toHaveBeenCalled();
    expect(result).toBe(cacheHitValue);
    expect(result).not.toBe(cacheMissValue);
  });

  it("should throw error if no underlying KVNamespace give", () => {
    expect(() => new KvCache(undefined as any)).throws();
  });
});
