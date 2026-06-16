import { describe, it, expect } from "vitest";
import { isInServiceArea, normalizeZip } from "./service-area";

describe("service area", () => {
  it("accepts a downtown Indianapolis ZIP", () => {
    expect(isInServiceArea("46204")).toBe(true);
  });
  it("accepts a ZIP+4 by using the 5-digit prefix", () => {
    expect(isInServiceArea("46204-1234")).toBe(true);
  });
  it("rejects an out-of-area (Ohio) ZIP", () => {
    expect(isInServiceArea("45402")).toBe(false);
  });
  it("normalizes whitespace and rejects invalid input", () => {
    expect(normalizeZip("  46204 ")).toBe("46204");
    expect(isInServiceArea("abc")).toBe(false);
  });
});
