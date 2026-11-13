import { describe, expect, it } from "vitest";
import { getFileName } from "../utils/getFileName";

describe("getFileName", () => {
  it("uses explicit fileName when provided", () => {
    expect(
      getFileName({ uri: "https://x/a.pdf", fileName: "report.pdf" }, false),
    ).toBe("report.pdf");
  });

  it("extracts the last path segment from uri", () => {
    expect(
      getFileName({ uri: "https://cdn.example.com/files/doc.pdf" }, false),
    ).toBe("doc.pdf");
  });

  it("strips query params by default", () => {
    expect(
      getFileName(
        { uri: "https://cdn.example.com/files/doc.pdf?token=abc" },
        false,
      ),
    ).toBe("doc.pdf");
  });

  it("does not throw on malformed percent-encoding", () => {
    expect(
      getFileName({ uri: "https://cdn.example.com/files/%doc.pdf" }, false),
    ).toBe("%doc.pdf");
  });
});
