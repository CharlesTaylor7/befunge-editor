import * as R from 'ramda'
import { Stack } from 'immutable'

export type StackType = Stack<number>

const empty = Stack()

const isEmpty = (stack) => stack.isEmpty()

const push = R.curry((head, tail) => tail.push(head))
const peek = (stack) => stack.peek() || 0

const pop = R.curry((num, stack) => {
  if (stack === undefined) throw Error()
  const result = []
  for (let i = 0; i < num; i++) {
    if (stack.isEmpty()) {
      result.push(0)
      continue
    }

    result.push(stack.peek())
    stack = stack.pop()
  }
  result.push(stack)
  return result
})

function* reverse(array) {
  for (let i = array.length - 1; i > -1; i--) {
    yield array[i]
  }
}

const fromArray = (array) => array.toReversed().reduce((stack, elem) => stack.push(elem), Stack())

const fromString = (str) => fromArray(Array.from({ length: str.length }, (_, k) => str.charCodeAt(k)))

export default {
  empty,
  isEmpty,
  push,
  pop,
  peek,
  fromArray,
  fromString,
}
