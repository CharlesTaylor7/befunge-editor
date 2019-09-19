import Stack from '../utilities/stack';

export default {
  editorFocus: { x: 0, y: 0 },
  currentInstruction: { x: 0, y: 0 },
  // type heading = 'Up' | 'Right' | 'Down' | 'Left'
  heading: 'Right',
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: {},
  dimensions: { height: 0, width: 0},
  // stack<int>
  stack: Stack.empty,
  activeBridge: false,
  executionComplete: false,
  stringMode: false,
};
