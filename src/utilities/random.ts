export function among<T>(...args: T[]) {
  return args[Math.floor(Math.random() * args.length)]
}
