import type { LoaderArgs } from "@remix-run/node";
import { buildPdf } from "~/services/pdf";

function pdf(content: Blob | Buffer | ArrayBuffer) {
  return new Response(content, {
    headers: new Headers({ "Content-Type": "application/pdf" }),
  });
}

export async function loader({ request: { url } }: LoaderArgs) {
  const origin = new URL(url).origin;
  const content = await buildPdf(origin);
  return pdf(content);
}
