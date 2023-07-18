import type { Location, Grid } from '@/types'
import { gridLookup } from '@/grid'

type PartialState = {
  grid: Grid
  executionPointer: Location
}
export default (state: PartialState) => {
  return gridLookup(state.grid, state.executionPointer)
}
