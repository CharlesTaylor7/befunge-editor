import type { ExecutionState } from '@/utilities/defaultState'
import type { Grid } from '@/grid'
import { gridLookup } from '@/grid'

type Location = { x: number; y: number }
type PartialState = {
  grid: Grid
  executionPointer: Location
}
export default (state: PartialState) => {
  return gridLookup(state.grid, state.executionPointer)
}
