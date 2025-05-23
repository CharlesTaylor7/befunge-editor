import * as R from 'ramda'
import { Stack } from 'immutable'

export type StackType = Stack<number>

const empty: StackType = Stack()

const isEmpty = (stack: StackType) => stack.isEmpty()

const push = R.curry((head: number, tail: StackType) => tail.push(head))
const peek = (stack: StackType) => stack.peek() || 0

const pop = R.curry((num: number, stack: StackType) => {
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

const fromArray = (array: number[]) =>
  array.reverse().reduce((stack: StackType, elem: number) => stack.push(elem), Stack())

const fromString = (str: string) => fromArray(Array.from({ length: str.length }, (_, k) => str.charCodeAt(k)))

export default {
  empty,
  isEmpty,
  push,
  pop,
  peek,
  fromArray,
  fromString,
}
