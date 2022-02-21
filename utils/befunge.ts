import { List, Stack } from 'immutable';
import * as R from 'ramda';


export type Dimensions = {
  height: number;
  width: number;
}

export type ExecutionState = {
  executionPointer: { x: number, y: number },
  heading: 'U' | 'R' | 'D' | 'L',
  grid: List<string>,
  stack: Stack<number>,
  console: '',
  activeBridge: boolean,
  stringMode: boolean,
  pendingInput: 'Number' | 'Character' | false,
}


export const initialExecutionState: ExecutionState = {
  executionPointer: { x: 0, y: 0 },
  heading: 'R',
  grid: List(),
  stack: Stack(),
  console: '',
  activeBridge: false,
  stringMode: false,
  pendingInput: false,
}



// type program: string[]
export function init (program: Array<string>) {
  const height = program.length;
  const width = program.reduce(R.maxBy(line => line.length)).length;
  const dimensions = { height, width };

  const grid = { };
  for (let j = 0; j < height; j++) {
    const line = program[j];
    for (let i = 0; i < width; i++) {
      grid[`${i}-${j}`] = line[i];
    }
  }

  return { grid, dimensions };
}

// program: string[]
// stdin: iterator<int | char>
export function* run(program: Array<string>, stdin: Generator<string | number>) {
  const store = newStore(init(program));

  let state = store.getState();

  while (!state.executionComplete) {
    executeAndAdvance(store.dispatch);
    state = store.getState();
    if (state.pendingInput) {
      const fromStream = stdin.next().value;
      const input = typeof fromStream === 'string'
        ? fromStream.charCodeAt(0)
        : fromStream;
      store.dispatch({ type: 'PUSH_INPUT', input });
      yield store.getState();
    } else {
      yield state;
    }
  }
}

export function completesIn<T>(n: number, generator: Generator<T>): T | undefined {
  let value;
  for(let i = 0; i < n + 1; i++) {
    const next = generator.next();
    if (next.done) return value;
    value = next.value;
  }
  throw new Error(`Iterable did not complete in ${n} or less steps.`)
}
