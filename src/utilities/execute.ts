import type { Lens } from "ramda";
import * as R from "ramda";

import type { ExecutionState } from "@/types";
import Stack from "@/utilities/stack";
import * as Random from "@/utilities/random";
import { quot, rem } from "@/utilities/integerDivision";
import move from "@/utilities/move";
import { gridLookup, gridUpdate } from "@/grid";

type Args = {
  strict?: boolean;
  instruction?: string;
};
/**
 * Execute the current instruction of the program
 */
export function execute(state: ExecutionState, args: Args = {}): ExecutionState {
  const instruction =
    args.instruction !== undefined ? args.instruction : gridLookup(state.grid, state.executionPointer);
  const strict = args.strict !== undefined ? args.strict : true;

  if (state.pendingInput) {
    if (strict) {
      throw new Error("cannot execute while input pending");
    } else {
      return state;
    }
  }

  if (typeof instruction !== "string") {
    throw new Error("Instruction is not a string.");
  }
  if (instruction.length !== 1) {
    throw new Error("Instruction should be a single character.");
  }

  if (state.stringMode && instruction !== '"') {
    return R.over(lens("stack"), Stack.push(instruction.charCodeAt(0)), state);
  }

  const charCode = instruction.charCodeAt(0);
  const number = charCode - "0".charCodeAt(0);

  if (number >= 0 && number < 10) {
    return R.over(lens("stack"), Stack.push(number), state);
  }

  switch (instruction) {
    case "+":
      return runBinaryOpOnStack((a, b) => a + b)(state);
    case "-":
      return runBinaryOpOnStack((a, b) => b - a)(state);
    case "*":
      return runBinaryOpOnStack((a, b) => a * b)(state);
    case "/":
      return runBinaryOpOnStack((a, b) => quot(b, a))(state);
    case "%":
      return runBinaryOpOnStack((a, b) => rem(b, a))(state);
    case "!": {
      const value = state.stack.pop();
      state.stack.push(value ? 0 : 1);
      return state;
    }
    case "`":
      return runBinaryOpOnStack((a, b) => (b > a ? 1 : 0))(state);
    case ">":
      return R.set(lens("heading"), "Right", state);
    case "<":
      return R.set(lens("heading"), "Left", state);
    case "^":
      return R.set(lens("heading"), "Up", state);
    case "v":
      return R.set(lens("heading"), "Down", state);
    case "?":
      return R.set(lens("heading"), Random.among("Right", "Left", "Up", "Down"), state);
    case "_": {
      const value = state.stack.pop();
      state.heading = value ? "Left" : "Right";
      return state;
    }
    case "|": {
      const value = state.stack.pop();
      state.heading = value ? "Up" : "Down";
      return state;
    }
    case '"':
      return R.over(lens("stringMode"), (mode) => !mode, state);
    case ":":
      return R.over(lens("stack"), (stack) => Stack.push(Stack.peek(stack), stack), state);
    case "\\": {
      const stack = state.stack;
      const a = Stack.pop(stack);
      const b = Stack.pop(stack);
      stack.push(a, b);
      return state;
    }
    case "$":
      state.stack.pop();
      return state;
    case ".": {
      const value = Stack.pop(state.stack);
      state.console += `${value} `;
      return state;
    }
    case ",": {
      const value = Stack.popAscii(state.stack);
      state.console += `${value}`;
      return state;
    }
    case "#":
      return R.set(lens("activeBridge"), true, state);
    case "g": {
      const stack = state.stack;
      const y = Stack.pop(stack);
      const x = Stack.pop(stack);

      const value = gridLookup(state.grid, { x, y });
      stack.push(value.charCodeAt(0));
      return state;
    }
    case "p": {
      const stack = state.stack;
      const y = Stack.pop(stack);
      const x = Stack.pop(stack);
      const value = Stack.pop(stack);
      gridUpdate(state.grid, { x, y }, value);
      return state;
    }
    case "&":
      return R.set(lens("pendingInput"), "number")(state);
    case "~":
      return R.set(lens("pendingInput"), "text")(state);
    case "@":
      return R.set(lens("executionComplete"), true, state);
    case " ":
      return state;
    default: {
      const message = `Unrecognized instruction: '${instruction}'.`;
      if (strict) {
        throw new Error(message);
      } else {
        console.error(message);
        return state;
      }
    }
  }
}

type Op = (a: number, b: number) => number;

const runBinaryOpOnStack = (op: Op) =>
  R.over(lens("stack"), (stack) => {
    const a = Stack.pop(stack);
    const b = Stack.pop(stack);
    return Stack.push(op(a, b), stack);
  });

/**
 * Advance to the next instruction in the program
 */
export function advance(state: ExecutionState): ExecutionState {
  const jumpSize = state.activeBridge ? 2 : 1;
  return R.pipe(
    R.set(lens("activeBridge"), false),
    R.over(
      lens("executionPointer"),
      move({
        jumpSize,
        direction: state.heading,
        dimensions: state.dimensions,
      }),
    ),
  )(state);
}

/**
 * Provide user input so the program can resume execution
 */
export function pushInput(state: ExecutionState, input: string): ExecutionState {
  if (!state.pendingInput) {
    throw new Error("Cannot push input before the program requests it");
  }
  let value: number;
  if (state.pendingInput === "number") {
    value = parseInt(input);
  } else if (state.pendingInput === "text") {
    if (input.length === 1) {
      value = input.charCodeAt(0);
    } else {
      throw new Error(`Expected single character input: ${input}`);
    }
  } else {
    throw new Error(`Invalid input type: ${state.pendingInput}`);
  }

  return {
    ...state,
    stack: Stack.push(value, state.stack),
    pendingInput: false,
  };
}

function lens<K extends keyof ExecutionState>(key: K): Lens<ExecutionState, ExecutionState[K]> {
  return R.lensProp(key);
}
