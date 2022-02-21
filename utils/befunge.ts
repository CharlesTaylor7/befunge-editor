import { Stack } from 'immutable'
import * as R from 'ramda'
import { Grid, gridLookup, initialGrid } from '@/utils/grid'
import move from './move'

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
  console: ''
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

// type program: string[]
export function init(program: Array<string>) {
  const height = program.length
  // @ts-ignore
  const width = program.reduce(R.maxBy((line) => line.length)).length
  const dimensions = { height, width }

  const grid = {}
  for (let j = 0; j < height; j++) {
    const line = program[j]
    for (let i = 0; i < width; i++) {
      // @ts-ignore
      grid[`${i}-${j}`] = line[i]
    }
  }

  return { grid, dimensions }
}

export function* run(program: Array<string>, stdin: Generator<string | number>): Iterable<ExecutionState> {
  // @ts-ignore
  const store = newStore(init(program))
  let state = store.getState()

  while (!state.executionComplete) {
    // @ts-ignore
    executeAndAdvance(store.dispatch)
    state = store.getState()
    if (state.pendingInput) {
      const fromStream = stdin.next().value
      const input = typeof fromStream === 'string' ? fromStream.charCodeAt(0) : fromStream
      store.dispatch({ type: 'PUSH_INPUT', input })
      yield store.getState()
    } else {
      yield state
    }
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
