const GOTENBERG_DEMO_URL =
  "https://demo.gotenberg.dev/forms/chromium/convert/url";

/**
 * Uses gotenberg's free demo to convert an url to a PDF.
 * The demo has known limitations.
 * @see {@link https://gotenberg.dev/docs/get-started/live-demo} for more info.
 */
export async function convertUrlToPdf(url: URL) {
  const formData = new FormData();
  formData.set("url", url.toString());
  formData.set("extraHttpHeaders", JSON.stringify({ "X-theme": "light" }));
  const response = await fetch(GOTENBERG_DEMO_URL, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Received error from gotenberg: ${response.statusText}`);
  } else if (response.body === null) {
    throw new Error("No response from gotenberg.");
  }
  return response.body;
}
