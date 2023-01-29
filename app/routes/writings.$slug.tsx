import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPost } from "~/services/writings.db";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { PUBLISH_DATE_FORMATTER } from "~/utils";

export async function loader({ params, request }: LoaderArgs) {
  const { slug } = params;
  invariant(typeof slug === "string", "Missing slug");
  const post = await getPost(new URL(request.url).origin, slug);
  invariant(post !== undefined, "Could not find post");
  return json({ post });
}

export default function BlogPost() {
  const {
    post: { code, frontmatter },
  } = useLoaderData<typeof loader>();
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <article className="prose">
      <h1>{frontmatter.title}</h1>
      {frontmatter.date !== undefined && (
        <p className="subtitle">
          published {PUBLISH_DATE_FORMATTER.format(new Date(frontmatter.date))}
        </p>
      )}
      <Component />
    </article>
  );
}
