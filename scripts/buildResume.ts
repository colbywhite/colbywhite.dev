import { convertUrlToPdf } from "../app/services/pdf";
import fs from "fs";
import invariant from "tiny-invariant";

// use "ngrok http 80" to set up a reverse proxy
const domain = "" as const;

(async () => {
  invariant(domain.length > 1, "Specify the domain to generate the pdf from.");
  invariant(
    !domain.startsWith("http://localhost"),
    "Use a domain that is not localhost"
  );
  const response = await convertUrlToPdf(new URL(`${domain}/about`));
  fs.writeFileSync("./public/resume.pdf", Buffer.from(response));
})();
