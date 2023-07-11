import * as R from 'ramda'
import { Stack } from 'immutable'
import * as Random from '@/utils/random'
import { quot, rem } from '@/utils/integerDivision'
import { ExecutionState, getCurrentInstruction } from '@/utils/befunge'
import { Grid, gridLookup, gridUpdate, gridInit, emptyGrid } from '@/cra/grid'

export default function (state: ExecutionState, instruction: string = getCurrentInstruction(state)): ExecutionState {
  if (typeof instruction !== 'string') {
    throw new Error('Instruction is not a string.')
  }
  if (instruction.length !== 1) {
    throw new Error('Instruction should be a single character.')
  }
  if (state.executionComplete) return state
  if (state.stringMode && instruction !== '"') {
    // @ts-ignore
    return R.over(R.lensProp('stack'), (stack) => stack.push(instruction.charCodeAt(0)), state)
  }
  const charCode = instruction.charCodeAt(0)
  const n = charCode - '0'.charCodeAt(0)

  if (n >= 0 && n < 10) {
    return R.over(R.lensProp('stack'), (stack) => stack.push(n), state)
  }
  switch (instruction) {
    case '+':
      return runBinaryOpOnStack((a, b) => a + b)(state)
    case '-':
      return runBinaryOpOnStack((a, b) => b - a)(state)
    case '*':
      return runBinaryOpOnStack((a, b) => a * b)(state)
    case '/':
      return runBinaryOpOnStack((a, b) => quot(b, a))(state)
    case '%':
      return runBinaryOpOnStack((a, b) => rem(b, a))(state)
    case '!':
      return R.over(R.lensPath(['stack', 'head']), (x) => (x === 0 ? 1 : 0), state)
    case '`':
      return runBinaryOpOnStack((a, b) => (b > a ? 1 : 0))(state)
    case '>':
      return R.set(R.lensProp('heading'), 'R', state)
    case '<':
      return R.set(R.lensProp('heading'), 'L', state)
    case '^':
      return R.set(R.lensProp('heading'), 'U', state)
    case 'v':
      return R.set(R.lensProp('heading'), 'D', state)
    case '?':
      return R.set(R.lensProp('heading'), Random.among('R', 'L', 'U', 'D'), state)
    case '_':
      return {
        ...state,
        stack: state.stack.pop(),
        heading: state.stack.peek() ? 'L' : 'R',
      }
    case '|':
      return {
        ...state,
        stack: state.stack.pop(),
        heading: state.stack.peek() ? 'U' : 'D',
      }
    case '"':
      return R.over(R.lensProp('stringMode'), (mode) => !mode, state)
    case ':':
      return R.over(R.lensProp('stack'), (stack) => stack.push(stack.peek() || 0), state)
    case '\\':
      return R.over(
        R.lensProp('stack'),
        (stack) => {
          const {
            items: [a, b],
            rest,
          } = pop(2, stack)
          return rest.push(a, b)
        },
        state,
      )
    case '$':
      return R.over(R.lensProp('stack'), (stack) => stack.pop(), state)
    case '.':
      return {
        ...state,
        stack: state.stack.pop(),
        console: state.console + state.stack?.peek() || ' ',
      }
    case ',':
      return {
        ...state,
        stack: state.stack.pop(),
        console: state.console + String.fromCharCode(state.stack?.peek() || 0),
      }
    case '#':
      return R.set(R.lensProp('activeBridge'), true, state)
    case 'g':
      return R.over(
        R.lensProp('stack'),
        (stack) => {
          const {
            items: [y, x],
            rest,
          } = pop(2, stack)
          const value = gridLookup(state.grid, x, y)
          return rest.push(value.charCodeAt(0))
        },
        state,
      )
    case 'p':
      const {
        items: [y, x, v],
        rest,
      } = pop(3, state.stack)
      const value = String.fromCharCode(v)
      console.log({ x, y, value })
      return {
        ...state,
        stack: rest,
        grid: gridUpdate(state.grid, x, y, value),
      }
    case '&':
      return R.set(R.lensProp('pendingInput'), 'Number', state)
    case '~':
      return R.set(R.lensProp('pendingInput'), 'Character', state)
    case '@':
      return {
        ...state,
        executionComplete: true,
      }
    case ' ':
      return state
    default:
      // TODO
      throw Error(`Unrecognized instruction: '${instruction}'.`)
    // return state
  }
}

type Op = (a: number, b: number) => number
type Update = (state: ExecutionState) => ExecutionState

const runBinaryOpOnStack = (op: Op): Update =>
  R.over(R.lensProp('stack'), (stack) => {
    const {
      items: [a, b],
      rest,
    } = pop(2, stack)
    return rest.push(op(a, b))
  })

type Pop = {
  items: Array<number>
  rest: Stack<number>
}

function pop(n: number, stack: Stack<number>): Pop {
  const items = []
  let rest = stack
  for (let i = 0; i < n; i++) {
    items.push(rest.peek() || 0)
    rest = rest.pop()
  }
  return { items, rest }
}
