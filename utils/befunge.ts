import { List, Stack } from 'immutable';

export type ExecutionState = {
  executionPointer: { x: number, y: number },
  heading: 'U' | 'R' | 'D' | 'L',
  grid: List<string>,
  stack: Stack<number>,
  console: '',
  activeBridge: boolean,
  stringMode: boolean,
  pendingInput: 'Number' | 'Character' | false,
}


export const initialExecutionState: ExecutionState = {
  executionPointer: { x: 0, y: 0 },
  heading: 'R',
  grid: List(),
  stack: Stack(),
  console: '',
  activeBridge: false,
  stringMode: false,
  pendingInput: false,
}
