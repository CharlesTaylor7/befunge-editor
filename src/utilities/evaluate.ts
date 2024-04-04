import type { ExecutionState, StackType } from "@/types";
import { gridInit } from "@/grid";
import Stack from "@/utilities/stack";
import {initialExecutionState} from "@/utilities/defaultState";
import { execute, advance, pushInput } from "@/utilities/execute";

export type Stdin = Iterator<string | number>;

export function* run(program: Array<string>, stdin?: Stdin): Generator<ExecutionState> {
  let state = {
    ...initialExecutionState,
    ...gridInit(program),
  };
  while (!state.executionComplete) {
    state = execute(state);
    if (state.pendingInput) {
      if (!stdin) {
        throw new Error("Stdin required to run this program");
      }
      state = pushInput(state, stdin.next().value);
    }
    state = advance(state);
    yield state;
  }
}

export function completesIn<T>(n: number, iterator: Iterator<T>): T {
  let value;
  for (let i = 0; i < n + 1; i++) {
    const next = iterator.next();
    if (next.done) return next.value || value;
    value = next.value;
  }
  throw new Error(`Iterator did not complete in ${n} or less steps.`);
}
