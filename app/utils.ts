import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

/**
 * This is a shortcut for creating application/pdf responses. Sets the Content-Type header and the Content-Disposition header if a filename is given.
 * @param content the PDF content.
 * @param filename the resulting filename the user should download. A '.pdf' ending is added if not provided.
 */
export function pdf(
  content: Blob | Buffer | ArrayBuffer | ReadableStream<Uint8Array>,
  filename?: string
) {
  const headers = new Headers({ "Content-Type": "application/pdf" });
  if (filename) {
    const pdfFilename = filename.endsWith(".pdf")
      ? filename
      : `${filename}.pdf`;
    headers.set("Content-Disposition", `attachment; filename="${pdfFilename}"`);
  }
  return new Response(content, { headers });
}

export const PUBLISH_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Chicago",
});

export class OutOfBoundsError extends Error {
  constructor(public readonly newValue: number, message?: string) {
    super(message);
  }
}
