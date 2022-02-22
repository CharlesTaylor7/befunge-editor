import { List, Stack } from 'immutable'
import * as R from 'ramda'
import { Grid, gridLookup, gridUpdate, initialGrid } from '@/utils/grid'
import move from './move'
import execute from './execute'

export type Dimensions = {
  height: number
  width: number
}
export type Direction = 'U' | 'R' | 'D' | 'L'

export type ExecutionState = {
  executionPointer: { x: number; y: number }
  heading: Direction
  grid: Grid
  stack: Stack<number>
  console: string
  activeBridge: boolean
  stringMode: boolean
  pendingInput: 'Number' | 'Character' | false
  executionComplete: boolean
}

export const initialExecutionState: ExecutionState = {
  executionPointer: { x: 0, y: 0 },
  heading: 'R',
  grid: initialGrid,
  stack: Stack(),
  console: '',
  activeBridge: false,
  stringMode: false,
  pendingInput: false,
  executionComplete: false,
}

export function init(program: Array<string>): Grid {
  const height = program.length
  // @ts-ignore
  const width = program.reduce(R.maxBy((line) => line.length)).length

  let grid: Grid = { height, width, cells: List() }
  for (let j = 0; j < height; j++) {
    const line = program[j]
    for (let i = 0; i < width; i++) {
      grid = gridUpdate(grid, i, j, line[i] || ' ')
    }
  }

  return grid
}

export function pushInput(state: ExecutionState, input: number): ExecutionState {
  return {
    ...state,
    stack: state.stack.push(input),
    pendingInput: false,
  }
}

export function* run(program: Array<string>, stdin: Generator<string | number>): Iterable<ExecutionState> {
  // @ts-ignore
  const grid = init(program)
  let state = {
    ...initialExecutionState,
    grid,
  }

  while (!state.executionComplete) {
    state = advancePointer(execute(state))
    if (state.pendingInput) {
      const value = stdin.next().value
      const input = typeof value === 'string' ? value.charCodeAt(0) : value
      state = pushInput(state, input);
    }
    yield state
  }
}

export function completesIn<T>(n: number, generator: Generator<T>): T | undefined {
  let value
  for (let i = 0; i < n + 1; i++) {
    const next = generator.next()
    if (next.done) return value
    value = next.value
  }
  throw new Error(`Iterable did not complete in ${n} or less steps.`)
}

export function getCurrentInstruction(state: ExecutionState): string {
  const {
    executionPointer: { x, y },
    grid,
  } = state
  return gridLookup(grid, x, y)
}

export function advancePointer(state: ExecutionState): ExecutionState {
  const jumpSize = state.activeBridge ? 2 : 1
  return {
    ...state,
    activeBridge: false,
    // @ts-ignore
    executionPointer: move({
      jumpSize,
      direction: state.heading,
      dimensions: state.grid,
    })(state.executionPointer),
  }
}
