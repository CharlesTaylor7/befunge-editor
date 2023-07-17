import { gridLookup } from '@/grid'

export default (state) => {
  return gridLookup(state.grid, state.executionPointer)
}
