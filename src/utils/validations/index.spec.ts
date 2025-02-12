import { isEmptyText } from ".";

describe("isEmptyText", () => {
  it("should return true for a empty text", () => {
    expect(isEmptyText("")).toBe(true);
    expect(isEmptyText("  ")).toBe(true);
    expect(isEmptyText("test")).toBe(false);
  });
});
