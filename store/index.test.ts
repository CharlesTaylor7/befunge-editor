import wu from 'wu'
import { Stack } from 'immutable'
import { run, completesIn } from '@/utils/befunge'

function stackFromString(input: string): Stack<number> {
  let stack: Stack<number> = Stack()
  for (let c of input) {
    stack = stack.push(c.charCodeAt(0))
  }
  return stack
}

describe('interpreter', () => {
  test('Hello, World!', () => {
    const program = ['"!dlroW ,olleH",,,,,,,,,,,,,@']
    expect(completesIn(29, run(program))).toMatchObject({
      console: 'Hello, World!',
      executionComplete: true,
      stringMode: false,
      stack: Stack(),
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
    expect(stackSnapshots).toEqual([Stack(), Stack.of(4, 3, 2, 1), Stack.of(4, 3, 2, 1, 4, 3, 2, 1)])
  })
  test('A self modifying program', () => {
    const program = ['930pv', '   @ ', '   , ', '   " ', '   ^<']
    expect(completesIn(100, run(program))).toMatchObject({
      console: '^',
      stack: stackFromString('\t@,'),
      grid: {
        '3-0': '\t',
      },
    })
  })
  test('A quine', () => {
    const program = ['01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@']
    expect(completesIn(2500, run(program))).toMatchObject({
      console: program[0],
    })
  })
  test.only('A factorial program', () => {
    const program = ['&>:1-:v v *_$.@', ' ^    _$>\\:^']
    // expect(completesIn(1000, run(program, [0].values())))
    // .toMatchObject({
    //   console: '1 ',
    // })
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
