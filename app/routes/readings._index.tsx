import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { BookmarkService } from "~/services/bookmarks";
import { redirect } from "@remix-run/router";
import Paging from "~/components/Paging";
import { OutOfBoundsError } from "~/utils";

export async function loader({ request, context }: LoaderArgs) {
  const { bookmark } = context.services as {
    bookmark: BookmarkService;
  };
  const url = new URL(request.url);
  const params = url.searchParams;
  const page = Number(params.get("p") || 1) - 1;
  const { bookmarks, paging } = await bookmark
    .getBookmarks({ page, perPage: 25 })
    .catch((err) => {
      if (err instanceof OutOfBoundsError) {
        const newParams = new URLSearchParams(params);
        newParams.set("p", String(err.newValue + 1));
        const newUrl = new URL(url);
        newUrl.search = newParams.toString();
        throw redirect(newUrl.href);
      }
      throw err;
    });

  return json({ bookmarks, paging });
}

// TODO add error boundary
export default function ReadingListing() {
  const { bookmarks, paging } = useLoaderData<typeof loader>();
  return (
    <main className="prose">
      <h1>Readings</h1>
      <p className="subtitle">Articles I've read and bookmarked for later</p>
      <ul>
        {bookmarks.map(({ domain, _id, title, link }) => (
          <li key={_id}>
            <a href={link}>{title}</a> <br className="md:hidden" />
            <span className="prose-sm italic">via {domain}</span>
          </li>
        ))}
      </ul>
      <Paging total={paging.numPages} current={paging.currentPage} />
    </main>
  );
}
