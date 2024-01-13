export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
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
