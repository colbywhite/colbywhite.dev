import { pdf, validateEmail } from "./utils";
import { describe, it, expect } from "vitest";

describe("validateEmail", () => {
  it("should return false for non-emails", () => {
    expect(validateEmail(undefined)).toBe(false);
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail("")).toBe(false);
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("n@")).toBe(false);
  });

  it("should return true for emails", () => {
    expect(validateEmail("kody@example.com")).toBe(true);
  });
});

describe("pdf", () => {
  it("should set Content-Type header", () => {
    const { headers } = pdf(new Blob());
    expect(headers.get("Content-Type")).toEqual("application/pdf");
  });

  it("should set Content-Disposition header only when filename given", () => {
    const missingHeader = pdf(new Blob()).headers.get("Content-Disposition");
    expect(missingHeader).toBeNull();
    const existentHeader = pdf(new Blob(), "file.pdf").headers.get(
      "Content-Disposition"
    );
    expect(existentHeader).toEqual('attachment; filename="file.pdf"');
  });

  it("should add pdf file extension when missing", () => {
    const { headers } = pdf(new Blob(), "file");
    expect(headers.get("Content-Disposition")).toEqual(
      'attachment; filename="file.pdf"'
    );
  });
});
