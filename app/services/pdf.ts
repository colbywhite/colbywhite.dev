import puppeteer from "puppeteer";

export async function buildPdf(origin: string) {
  const browser = await puppeteer.launch();
  console.log("launched", origin);
  const page = await browser.newPage();
  console.log("newPage");
  const response = await page.goto(origin, {
    waitUntil: ["domcontentloaded", "load", "networkidle0", "networkidle2"],
  });
  console.log("goto");
  if (response === null) {
    console.error("null response!");
  } else if (!response.ok()) {
    console.error("bad response", response.statusText());
  }
  console.log("creating pdf");
  const contents = await page.pdf({
    margin: {
      top: 10,
      bottom: 10,
    },
    landscape: false,
    format: "a4",
  });
  console.log("created pdf");
  return contents;
}
