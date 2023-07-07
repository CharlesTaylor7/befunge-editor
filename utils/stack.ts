import * as R from 'ramda'
import wu from 'wu'

export type Stack = Empty | NonEmpty;

class Empty implements Iterable<number> {
  head: 0
  tail: Empty
  [Symbol.iterator]: () => Iterator<number> = (function* empty() { });

  constructor() {
    this.head = 0;
    this.tail = this;
    return Object.freeze(this);
  }
}


const isStack = (stack: Stack) =>
  [Empty, NonEmpty].some((constructor) => constructor.name === stack.constructor.name)



class NonEmpty implements Iterable<number> {
  head: number
  tail: Stack
  [Symbol.iterator]: () => Iterator<number>;
  //= (function* empty() { });

  constructor(head, tail) {
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
    this[Symbol.iterator] = (
      function* iterateStack() {
        yield this.head;
        yield* this.tail;
      }
    ).bind(this);

    return Object.freeze(this);
  }
}

const empty: Empty = new Empty();

const isEmpty = stack => stack.constructor.name === Empty.name;

const push = R.curry((head, tail) => new NonEmpty(head, tail));

const pop = R.curry((num, stack) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(stack.head);
    stack = stack.tail;
  }
  result.push(stack);
  return result;
});

function* reverse(array) {
  for(let i = array.length - 1; i > -1; i--) {
    yield array[i];
  }
}
type FromArray = (array: Array<number>) => Stack
const fromArray: FromArray = R.pipe(
  reverse,
  // @ts-ignore
  wu.reduce((stack, elem) => push(elem, stack), empty)
);

type FromString = (array: Array<string>) => Stack
const fromString = R.pipe(
  reverse,
  // @ts-ignore
  wu.reduce((stack, char) => push(char.charCodeAt(0), stack), empty)
);

export default {
  empty,
  isEmpty,
  push,
  pop,
  fromArray,
  fromString,
}
