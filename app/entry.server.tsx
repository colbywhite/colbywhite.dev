import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onError(error) {
        console.error("renderToReadableStream error");
        console.error(error);
        responseStatusCode = 500;
      },
    }
  ).then(async (body) => {
    if (isbot(request.headers.get("user-agent"))) {
      await body.allReady;
    }
    responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  });
}
