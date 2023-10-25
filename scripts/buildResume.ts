import { convertUrlToPdf } from "../app/services/pdf";
import fs from "fs";
import invariant from "tiny-invariant";

const domain = "" as const;
// const domain = "http://localhost:8788" as const;

(async () => {
  invariant(domain.length > 1, "Specify the domain to generate the pdf from.");
  invariant(!domain.startsWith("http://localhost"), "Use a domain that is not localhost");
  const response = await convertUrlToPdf(new URL(`${domain}/resume`));
  fs.writeFileSync("./public/resume.pdf", Buffer.from(response));
})();
