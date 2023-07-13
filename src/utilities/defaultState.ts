import Stack from '../utilities/stack'
import { emptyGrid } from '@/cra/grid'

export default {
  editorFocus: { x: 0, y: 0 },
  executionPointer: { x: 0, y: 0 },
  // type heading = 'Up' | 'Right' | 'Down' | 'Left'
  heading: 'Right',
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: emptyGrid,
  dimensions: { height: 0, width: 0 },
  // stack<int>
  stack: Stack.empty,
  console: '',
  activeBridge: false,
  executionComplete: false,
  stringMode: false,
}
