import * as R from 'ramda'
import { execute, advance } from './execute';
import move from '../../utilities/move';
import { gridLens } from '../lenses';
import Stack from '../../utilities/stack';

export default (state, action) => {

  switch(action.type) {
    case "SET_GRID_DIMENSIONS": {
      const { height, width } = action;
      return R.set(R.lensProp('dimensions'), { height, width }, state);
    }
    case "EDIT_CELL": {
      const { position, value} = action;
      return R.set(gridLens(position), value, state);
    }
    case "SET_EDITOR_FOCUS": {
      const { x, y } = action.position;
      const { dimensions: { width, height }} = state;

      if (x >= 0 && x < width && y >= 0 && y < height) {
        return R.set(R.lensProp('editorFocus'), action.position, state);
      }
      return state;
    }
    case "ADVANCE": {
      return advance(state);
    }
    case "EXECUTE": {
      return execute(state);
    }
    case "PUSH_INPUT": {
      const { input } = action;
      if (typeof input !== 'number') {
        throw new Error('Input must be a number')
      }
      return R.pipe(
        R.set(R.lensProp('pendingInput'), false),
        R.over(R.lensProp('stack'), Stack.push(input))
      )(state);
    }
    default:
      return state;
  }
}
