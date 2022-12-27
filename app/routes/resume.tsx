import type { LoaderArgs } from "@remix-run/node";
import { convertUrlToPdf } from "~/services/pdf";
import { pdf } from "~/utils";

export async function loader({ request: { url } }: LoaderArgs) {
  // in dev, use a hard-coded url since we don't want to send localhost to gotenberg
  const origin =
    process.env.NODE_ENV === "production"
      ? new URL(url).origin
      : "https://colbywhite.dev";
  const contents = await convertUrlToPdf(new URL(origin));
  return pdf(contents, "colby.white.resume.pdf");
}
