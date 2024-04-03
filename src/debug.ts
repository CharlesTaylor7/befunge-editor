export function tap<T>(x: T, tag?: string): T {
  if (tag) {
    console.log(tag, x);
  } else {
    console.log(x);
  }
  return x;
}
