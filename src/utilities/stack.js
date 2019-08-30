import * as R from 'ramda'
import wu from 'wu'

class Empty {
  constructor() {
    this.head = 0;
    this.tail = this;
    this[Symbol.iterator] = function* () {}
    return Object.freeze(this);
  }
}

function* iterateStack() {
  yield this.head;
  yield* this.tail;
}

const isStack = stack =>
  R.any(
    constructor => constructor === stack.constructor.name,
    [Empty.name, Stack.name]
  );

class Stack {
  constructor(head, tail) {
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
    this[Symbol.iterator] = iterateStack.bind(this);
    return Object.freeze(this);
  }
}

const empty = new Empty();

const isEmpty = stack => stack.constructor.name === Empty.name;

const push = R.curry((head, tail) => new Stack(head, tail));

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

const fromArray = R.pipe(
  reverse,
  wu.reduce((stack, elem) => push(elem, stack), empty)
);

const fromString = R.pipe(
  reverse,
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
