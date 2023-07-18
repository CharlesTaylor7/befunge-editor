import * as R from 'ramda'
import { Seq } from 'immutable'

import type { ExecutionState, StackType } from '@/types'
import { gridInit } from '@/grid'
import Stack from '@/utilities/stack'
import { run, completesIn } from '@/utilities/evaluate'

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
    expect(() => completesIn(1000, run(program))).toThrow('Iterator did not complete in 1000 or less steps.')
  })
  test('Infinite loop w/ unbounded stack growth', () => {
    const program = ['>1v', '4 2', '^3<']
    const stackSnapshots = Seq(run(program))
      .map((state, i) => [state.stack, i] as [StackType, number])
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
