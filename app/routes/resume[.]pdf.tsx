import type { LoaderArgs } from "@remix-run/cloudflare";
import { convertUrlToPdf } from "~/services/pdf";
import { pdf } from "~/utils";

export async function loader({ request: { url } }: LoaderArgs) {
  // in dev, use a hard-coded url since we don't want to send localhost to gotenberg
  const parsedUrl = new URL(url);
  const origin = parsedUrl.origin.includes("localhost")
    ? "https://colbywhite.dev"
    : parsedUrl.origin;
  const contents = await convertUrlToPdf(new URL("resume", origin));
  return pdf(contents, "colby.white.resume.pdf");
}
