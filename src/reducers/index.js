import * as R from 'ramda'
import * as Stack from '../utilities/stack';
import { executeCurrent } from './instructions';

const initialState = {
  position: { x: 0, y: 0},
  // type heading = 'north' | 'east' | 'south' | 'west'
  heading: 'east',
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: {},
  dimensions: { height: 0, width: 0},
  // stack<int>
  stack: Stack.empty,
  // skip intermediate
  bridge: false,
  execution_complete: false,
}

export default (state = initialState, action) => {

  switch(action.type) {
    case "SET_GRID_DIMENSIONS": {
      const { height, width } = action;
      return R.mergeRight(state, { dimensions: { height, width }})
    }
    case "ADVANCE": {
      const jumpSize = bridge ? 2 : 1;
      const alteration = () => {
        const { x, y} = state.position;
        switch (state.heading) {
          case 'north': return { y: y + jumpSize};
          case 'east': return { x: x + jumpSize};
          case 'south': return { y: y - jumpSize};
          case 'west': return { x: x - jumpSize};
          default:
           throw new Error("Unrecognized heading!");
        }
      };
      return R.mergeDeepRight(state, { position: alteration(), bridge: false});
    }
    case "EXECUTE_CURRENT_INSTRUCTION": {
      return executeCurrent(state);
    }
    case "EDIT_CELL": {
      return R.mergeDeepRight(state, { grid: { [action.cellId]: action.instruction }});
    }
    default:
      return state;
  }
}
