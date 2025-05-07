import { z } from "astro:content";

export default z.object({
  id: z.number(),
  documentId: z.string(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  Title: z.string(),
  Description: z.string().nullable(),
  Featured: z.boolean(),
  Body: z.string(),
});
