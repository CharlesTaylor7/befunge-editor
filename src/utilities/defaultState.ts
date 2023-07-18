import Stack from '@/utilities/stack'
import type { StackType } from '@/utilities/stack'
import { emptyGrid } from '@/grid'
import type { Grid } from '@/grid'

export type Direction = 'Up' | 'Right' | 'Down' | 'Left'

export type ExecutionState = {
  executionPointer: { x: number; y: number }
  heading: Direction
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: Grid
  dimensions: { height: number; width: number }
  // stack<int>
  stack: StackType
  console: string
  activeBridge: boolean
  executionComplete: boolean
  stringMode: boolean
  pendingInput: false | 'Number' | 'Character'
}

const defaultState: ExecutionState = {
  executionPointer: { x: 0, y: 0 },
  // type heading = 'Up' | 'Right' | 'Down' | 'Left'
  heading: 'Right',
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: emptyGrid,
  dimensions: { height: 0, width: 0 },
  // stack<int>
  stack: Stack.empty,
  console: '',
  activeBridge: false,
  executionComplete: false,
  stringMode: false,
  // false | 'Number' | 'Character'
  pendingInput: false,
}

export default defaultState
