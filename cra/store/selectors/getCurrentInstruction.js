import { gridLens } from '../lenses'
import * as R from 'ramda'

export default (state) => {
  const { executionPointer } = state
  const cellValue = R.view(gridLens(executionPointer), state)
  if (cellValue === undefined || cellValue === '') {
    return ' '
  }
  return cellValue
}
