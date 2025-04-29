import { z } from "astro:content";

export default z.object({
  title: z.string(),
  description: z.string().nullable(),
  featured: z.boolean(),
  body: z.string(),
  createdAt: z.string().datetime(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
