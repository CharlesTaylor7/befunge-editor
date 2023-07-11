import { gridLookup } from '@/cra/grid'

export default (state) => {
  return gridLookup(state.grid, state.executionPointer)
}
