import { quot, rem } from "@/utilities/integerDivision";

describe("integerDivision", () => {
  it("handles positive numbers", () => {
    expect(quot(1, 3)).toBe(0);
    expect(rem(1, 3)).toBe(1);
  });
  it("handles negative dividend", () => {
    expect(quot(-1, 3)).toBe(0);
    expect(rem(-1, 3)).toBe(-1);

    expect(quot(-2, 3)).toBe(0);
    expect(rem(-2, 3)).toBe(-2);
  });
  it("handles negative divisor", () => {
    expect(quot(1, -3)).toBe(0);
    expect(rem(1, -3)).toBe(1);
  });
});
