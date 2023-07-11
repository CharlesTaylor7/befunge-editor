import * as R from 'ramda'
import { Map } from 'immutable'
import { gridInit } from '@/cra/grid'
import wu from 'wu'
import Stack from '@/cra/utilities/stack'
import defaultState from '@/cra/store/defaultState'
import { execute, advance } from '@/cra/store/reducers/execute'


function pushInput(state, input: number) {
  return {
    ...state,
    stack: Stack.push(input, state.stack),
    pendingInput: false,
  }
}

type Stdin = Iterator<string | number>

function* run(program: Array<string>, stdin?: Stdin): Generator<ExecutionState> {
  let state = R.mergeRight(defaultState, gridInit(program))

  while (!state.executionComplete) {
    state = advance(execute(state))
    if (state.pendingInput) {
      // Defer stdin errors.
      // Many programs can be executed without it
      if (!stdin) {
        throw Error('Program expects stdin, but none was provided!')
      }
      const value = stdin.next().value
      const input = typeof value === 'string' ? value.charCodeAt(0) : value
      state = pushInput(state, input)
    }
    yield state
  }
}

const completesIn = (n, generator) => {
  let value
  for (let i = 0; i < n + 1; i++) {
    const next = generator.next()
    if (next.done) return value
    value = next.value
  }
  throw new Error(`Iterable did not complete in ${n} or less steps.`)
}

describe('interpreter', () => {
  test('Hello, World!', () => {
    const program = ['"!dlroW ,olleH",,,,,,,,,,,,,@']
    expect(completesIn(29, run(program))).toMatchObject({
      console: 'Hello, World!',
      executionComplete: true,
      stringMode: false,
      stack: Stack.empty,
    })
  })
  test('Infinite loop', () => {
    const program = ['>v', '^<']
    expect(() => completesIn(1000, run(program))).toThrow('Iterable did not complete in 1000 or less steps.')
  })
  test('Infinite loop w/ unbounded stack growth', () => {
    const program = ['>1v', '4 2', '^3<']
    const stackSnapshots = wu(run(program))
      .map((state) => state.stack)
      .enumerate()
      .filter(([_, index]) => index % 8 === 0)
      .take(3)
      .map((pair) => pair[0])
      .toArray()
    expect(stackSnapshots).toEqual([
      Stack.empty,
      Stack.fromArray([4, 3, 2, 1]),
      Stack.fromArray([4, 3, 2, 1, 4, 3, 2, 1]),
    ])
  })
  test('A self modifying program', () => {
    const program = ['930pv', '   @ ', '   , ', '   " ', '   ^<']
    const completionState = completesIn(100, run(program))
    expect(completionState).toMatchObject({
      console: '^',
      stack: Stack.fromString('\t@,'),
    })

    expect(completionState.grid.get('3-0')).toEqual('\t'.charCodeAt(0))
  })
  test('A quine', () => {
    const program = ['01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@']
    expect(completesIn(2500, run(program))).toMatchObject({
      console: program[0],
    })
  })
  test('A factorial program', () => {
    const program = ['&>:1-:v v *_$.@', ' ^    _$>\\:^']
    // 0 factorial does not work
    /*
    expect(completesIn(1000, run(program, [0].values()))).toMatchObject({ console: '1 ', })
    */
    expect(completesIn(1000, run(program, [1].values()))).toMatchObject({
      console: '1 ',
    })
    expect(completesIn(1000, run(program, [2].values()))).toMatchObject({
      console: '2 ',
    })
    expect(completesIn(1000, run(program, [3].values()))).toMatchObject({
      console: '6 ',
    })
    expect(completesIn(1000, run(program, [4].values()))).toMatchObject({
      console: '24 ',
    })
    expect(completesIn(1000, run(program, [5].values()))).toMatchObject({
      console: '120 ',
    })
  })
})
