import { List } from 'immutable'
import * as R from 'ramda'
import { Grid, gridLookup, gridUpdate, gridInit, emptyGrid } from '@/cra/grid'
import move from '@/utils/move'
import execute from '@/utils/execute'
import type Stack from '@/utils/stack'
import Stac from '@/utils/stack'

export type Dimensions = {
  height: number
  width: number
}
export type Direction = 'U' | 'R' | 'D' | 'L'

export type ExecutionState = {
  executionPointer: { x: number; y: number }
  heading: Direction
  grid: Grid
  stack: typeof Stack
  console: string
  activeBridge: boolean
  stringMode: boolean
  pendingInput: 'Number' | 'Character' | false
  executionComplete: boolean
}

export const initialExecutionState: ExecutionState = {
  executionPointer: { x: 0, y: 0 },
  heading: 'R',
  stack: Stac.empty,
  console: '',
  activeBridge: false,
  stringMode: false,
  pendingInput: false,
  executionComplete: false,
  grid: emptyGrid,
  dimensions: { height: 7, width: 7 },
}

export function init(program: string): Grid {
  const lines = program.split('\n')
  const height = lines.length
  const width = lines.reduce(R.maxBy((line: string) => line.length)).length
  let grid: Grid = { height, width, cells: List() }
  for (let j = 0; j < height; j++) {
    const line = lines[j]
    for (let i = 0; i < width; i++) {
      grid = gridUpdate(grid, i, j, line[i] || ' ')
    }
  }

  return grid
}

export function programFromGrid(grid: Grid): string {
  return Array.from({ length: grid.height }, (_, i) =>
    grid.cells
      .slice(i * grid.width, (i + 1) * grid.width)
      .map((n) => String.fromCharCode(n))
      .toArray()
      .join('')
      .trimEnd(),
  ).join('\n')
}

export function pushInput(state: ExecutionState, input: number): ExecutionState {
  return {
    ...state,
    stack: state.stack.push(input),
    pendingInput: false,
  }
}

export type Stdin = Iterator<string | number>

export function* run(program: Array<string>, stdin?: Stdin): Generator<ExecutionState> {
  const grid = init(program.join('\n'))
  let state = {
    ...initialExecutionState,
    grid,
  }

  while (!state.executionComplete) {
    state = advancePointer(execute(state))
    if (state.pendingInput) {
      // Defer stdin errors.
      // Many programs can be executed without it
      if (!stdin) {
        throw Error('Program expects stdin, but none was provided!')
      }
      const value = stdin.next().value
      const input = typeof value === 'string' ? value.charCodeAt(0) : value
      state = pushInput(state, input)
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
  if (state.executionComplete) return state
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
