import { execute } from "@/utilities/execute";
import { initialExecutionState as defaultState } from "@/utilities/defaultState";

describe("execute", () => {
  it("throws on unknown instructions", () => {
    expect(() => execute(defaultState(), { instruction: "b" })).toThrow(
      "Unrecognized instruction: 'b'",
    );
  }),
    it("throws if instruction is not a string", () => {
      expect(() => execute(defaultState(), { instruction: 2 as any })).toThrow(
        "Instruction is not a string",
      );
    });
  it("throws if instruction is more than a single character", () => {
    expect(() => execute(defaultState(), { instruction: "too long" })).toThrow(
      "Instruction should be a single character",
    );
  });
  it("throws if instruction is less than a single character", () => {
    expect(() => execute(defaultState(), { instruction: "" })).toThrow(
      "Instruction should be a single character",
    );
  });
  it("throws for capital V", () => {
    expect(() => execute(defaultState(), { instruction: "V" })).toThrow(
      "Unrecognized instruction: 'V'",
    );
  });
  it("sets heading downward for lowercase v", () => {
    expect(execute(defaultState(), { instruction: "v" })).toMatchObject({
      heading: "Down",
    });
  });
  it("does nothing with space", () => {
    expect(execute(defaultState(), { instruction: " " })).toEqual(
      defaultState(),
    );
  });
  it("pushes digits onto the stack", () => {
    const newState = execute(defaultState(), { instruction: "1" });
    expect(newState.stack).toEqual([1]);
  });
});
