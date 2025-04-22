import { z } from "astro:content";

export const RainDropItemSchema = z.object({
  title: z.string(),
  link: z.string(),
  created: z.string(),
  domain: z.string(),
  _id: z.number(),
});

export type RainDropItem = z.infer<typeof RainDropItemSchema>;

export interface RainDropResponse {
  items: RainDropItem[];
  count: number;
}

export interface CollectionResponse {
  item: {
    _id: number;
    title: string;
    description: string;
    slug: string;
    count: number;
    lastAction: string; // datetime
    created: string; // datetime
    lastUpdate: string; // datetime
    // there are more, but we only care about these
  };
}
