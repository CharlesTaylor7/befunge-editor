import * as R from 'ramda'
import Stack from '../../utilities/stack'
import * as Random from '../../utilities/random'
import { gridLens } from '../lenses'
import { quot, rem } from '../../utilities/integerDivision'
import getCurrentInstruction from '../selectors/getCurrentInstruction'

export default (
  state,
  instruction = getCurrentInstruction(state)
) => {
  if (typeof instruction !== 'string') {
    throw new Error("Instruction is not a string.");
  }
  if (instruction.length !== 1) {
    throw new Error("Instruction should be a single character.")
  }

  if (state.stringMode && instruction !== '"') {
    return R.over(R.lensProp('stack'), Stack.push(instruction.charCodeAt(0)), state);
  }
  const charCode = instruction.charCodeAt(0);
  const number = charCode - '0'.charCodeAt(0);

  if (number >= 0 && number < 10) {
    return R.over(R.lensProp('stack'), Stack.push(number), state);
  }

  switch (instruction) {
    case '+':
      return runBinaryOpOnStack((a, b) => a + b)(state);
    case '-':
      return runBinaryOpOnStack((a, b) => b - a)(state);
    case '*':
      return runBinaryOpOnStack((a, b) => a * b)(state);
    case '/':
      return runBinaryOpOnStack((a, b) => quot(b, a))(state);
    case '%':
      return runBinaryOpOnStack((a, b) => rem(b, a))(state);
    case '!':
      return R.over(R.lensPath(['stack', 'head']), x => x === 0 ? 1 : 0, state);
    case '`':
      return runBinaryOpOnStack((a, b) => b > a ? 1 : 0)(state);
    case '>':
      return R.set(R.lensProp('heading'), 'Right', state);
    case '<':
      return R.set(R.lensProp('heading'), 'Left', state);
    case '^':
      return R.set(R.lensProp('heading'), 'Up', state);
    case 'V':
      return R.set(R.lensProp('heading'), 'Down', state);
    case '?':
      return R.set(
        R.lensProp('heading'),
        Random.among('Right', 'Left', 'Up', 'Down'),
        state
      );
    case '_':
      return R.pipe(
        R.over(R.lensProp('stack'), stack => stack.tail),
        R.set(R.lensProp('heading'), state.stack.head ? 'Left' : 'Right'),
      )(state);
    case '|':
      return R.pipe(
        R.over(R.lensProp('stack'), stack => stack.tail),
        R.set(R.lensProp('heading'), state.stack.head ? 'Up' : 'Down'),
      )(state);
    case '"':
      return R.over(R.lensProp('stringMode'), mode => !mode, state);
    case ':':
      return R.over(
        R.lensProp('stack'),
        stack => Stack.push(stack.head, stack),
        state
      );
    case '\\':
      return R.over(
        R.lensProp('stack'),
        stack => {
          const [ a, b, rest ] = Stack.pop(2, stack);
          return Stack.push(b, Stack.push(a, rest));
        },
        state
      );
    case '$':
      return R.set(
        R.lensProp('stack'),
        stack => stack.tail,
        state
      );
    case '.':
      return R.pipe(
        R.over(R.lensProp('stack'), stack => stack.tail),
        R.over(
          R.lensProp('console'),
          console => console + state.stack.head + ' '
        )
      )(state);
    case ',':
      return R.pipe(
        R.over(R.lensProp('stack'), stack => stack.tail),
        R.over(
          R.lensProp('console'),
          console => console + String.fromCharCode(state.stack.head)
        )
      )(state);
    case '#':
      return R.set(
        R.lensProp('activeBridge'),
        true,
        state
      );
    case 'g':
      return R.over(
        R.lensProp('stack'),
        stack => {
          const [ y, x, rest ] = Stack.pop(2, stack);
          const value = R.view(gridLens({x, y}), state);
          return Stack.push(value.charCodeAt(0), rest);
        },
        state
      );
    case 'p':
      const [ y, x, value, rest ] = Stack.pop(3, state.stack);
      return R.pipe(
        R.set(gridLens({x, y}), String.fromCharCode(value)),
        R.set(R.lensProp('stack'), rest)
      )(state);
    case '&':
      return R.set(R.lensProp('pendingUserInput'), 'Number', state);
    case '~':
      return R.set(R.lensProp('pendingUserInput'), 'Character', state);
    case '@':
      return R.set(R.lensProp('executionComplete'), true, state);
    case ' ':
      return state;
    default:
      throw new Error(`Unrecognized instruction: '${instruction}'.`);
  }
}

const runBinaryOpOnStack = (op) =>
  R.over(R.lensProp('stack'), stack => {
    const [ a, b, rest ] = Stack.pop(2, stack);
    const head = op(a, b);
    return Stack.push(head, rest);
  });
