const handleNegativeZero = (number: number) => (number === -0 ? 0 : number)

export type QuotRem = {
  quot: number
  rem: number
}

export function quotRem(dividend: number, divisor: number): QuotRem {
  const rem = dividend % divisor
  const subtracted = dividend - rem
  const quot = handleNegativeZero(subtracted / divisor)
  return { quot, rem }
}

export type DivMod = {
  div: number
  mod: number
}

export function divMod(dividend: number, divisor: number): DivMod {
  const { quot, rem } = quotRem(dividend, divisor)
  if (Math.sign(rem) === -Math.sign(divisor)) {
    return { div: quot - 1, mod: rem + divisor }
  } else {
    return { div: quot, mod: rem }
  }
}

export const rem = (dividend: number, divisor: number) => quotRem(dividend, divisor).rem
export const quot = (dividend: number, divisor: number) => quotRem(dividend, divisor).quot
export const div = (dividend: number, divisor: number) => divMod(dividend, divisor).div
export const mod = (dividend: number, divisor: number) => divMod(dividend, divisor).mod
