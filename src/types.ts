import type { StackType } from '@/utilities/stack'
import type { Grid } from '@/grid'

export { Grid, StackType }

export type Location = { x: number; y: number }
export type Mode = 'edit' | 'step' | 'animate'
export type EditMode = 'text' | 'cell'
export type Program = {
  code: string[]
  name: string
  description?: string
}

export type AppState = {
  execution: ExecutionState
  mode: Mode
  editMode: EditMode
  programs: Program[]
}

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
