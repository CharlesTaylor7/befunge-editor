import * as R from 'ramda'
import wu from 'wu'

class Empty {
  constructor() {
    Object.defineProperty(this, "head", { value: 0, writable: false })
    Object.defineProperty(this, "tail", { value: this, writable: false })
    return Object.freeze(this);
  }

  *[Symbol.iterator]() {
  }

  toJSON() {
    return "Stack.Empty"
  }
}


function isStack(stack) {
  return [Empty, Stack].some((constructor) => constructor.name === stack.constructor.name)
}


class Stack {
  constructor(head, tail) {
    if (!isStack(tail)) {
      throw new Error('Tail must be a stack.')
    }
    this.head = head;
    this.tail = tail;
    return Object.freeze(this);
  }

  *[Symbol.iterator]() {
    yield this.head;
    yield* this.tail;
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
