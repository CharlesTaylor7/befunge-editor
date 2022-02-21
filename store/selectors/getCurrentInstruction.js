import { gridLens } from '../lenses'
import * as R from 'ramda'

export default function(state: ExecutionState, dimensions: ) => {
  const { executionPointer } = state;
  const cellValue = R.view(gridLens(executionPointer), state);
  if (cellValue === undefined || cellValue === '') {
    return ' ';
  }
  return cellValue;
}
