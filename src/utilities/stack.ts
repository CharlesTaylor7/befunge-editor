import * as R from "ramda";

export type StackType = Array<number>;

function empty(): StackType {
  return [];
}

function isEmpty(stack: StackType): boolean {
  return stack.length === 0;
}

function push(head: number, tail: StackType): StackType {
  tail.push(head);
  return tail;
}

export type PopResult = [number[], StackType];

function peek(stack: StackType): number {
  return stack.length ? stack[stack.length - 1] : 0;
}

function pop(stack: StackType): number {
  const value = stack.pop();
  return typeof value === "number" ? value : 0;
}

function popAscii(stack: StackType): string {
  return String.fromCharCode(pop(stack));
}

const fromArray = (array: number[]) => array.reverse();
const fromString = (str: string) =>
  Array.from({ length: str.length }, (_, k) => str.charCodeAt(k)).reverse();

export default {
  empty,
  isEmpty,
  push: R.curry(push),
  pop,
  popAscii,
  peek,
  fromArray,
  fromString,
};
