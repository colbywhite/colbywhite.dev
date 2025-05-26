import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { matter } from "vfile-matter";

export default async function (markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, { type: "yaml", marker: "-" })
    .use(remarkGfm)
    .use(remarkRehype)
    .use(() => (_tree, file) => matter(file))
    .use(rehypeStringify)
    .process(markdown);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return [String(file), file.data.matter as Record<string, any>] as const;
}
