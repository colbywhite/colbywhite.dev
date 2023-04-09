import { installGlobals } from "@remix-run/node";
import { afterEach, vi } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";

installGlobals();

afterEach(() => {
  vi.clearAllMocks();
});

export class NetworkMocker {
  private _server: ReturnType<typeof setupServer> | undefined;

  public constructor(public readonly headers?: Headers) {}

  private get server() {
    if (this._server === undefined) {
      this._server = setupServer();
      this._server.listen({
        onUnhandledRequest(req) {
          console.error(
            "🔶 Found an unhandled %s request to %s",
            req.method,
            req.url.href
          );
        },
      });
      process.once("SIGINT", () => this.cleanup());
      process.once("SIGTERM", () => this.cleanup());
      // console.info("🔶 Mock server running.");
    }
    return this._server;
  }

  public json(url: URL, json: JSONValue) {
    // this is the url w/o query params to avoid msw warnings
    const urlString = `${url.origin}${url.pathname}`;
    this.server.use(
      rest.get(urlString, (req, res, ctx) => {
        this.assertQueryParams(req.url, url);
        this.assertHeaders(req.headers, this.headers);
        return res(ctx.status(200), ctx.json(json));
      })
    );
  }

  public cleanup() {
    if (this._server) {
      this._server.resetHandlers();
      // console.info("🔶 Mock server reset.");
      this._server.close();
      // console.info("🔶 Mock server closed.");
      this._server = undefined;
    }
  }

  private assertQueryParams(actual: URL, expected: URL) {
    if (actual.searchParams) {
      expect(actual.searchParams).toEqual(expected.searchParams);
    }
  }

  private assertHeaders(actual: Headers, expected?: Headers) {
    if (expected !== undefined) {
      expected.forEach((val, key) => expect(actual.get(key)).toEqual(val));
    }
  }
}

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
