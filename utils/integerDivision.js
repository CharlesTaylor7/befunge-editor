const handleNegativeZero = number => number === -0 ? 0 : number;

export const quotRem = (dividend, divisor) => {
  const rem = dividend % divisor;
  const subtracted = dividend - rem;
  const quot = handleNegativeZero(subtracted / divisor);
  return { quot, rem };
}

export const divMod = (dividend, divisor) => {
  const { quot, rem } = quotRem(dividend, divisor);
  if (Math.sign(rem) === -(Math.sign(divisor))) {
    return { div: quot - 1, mod: rem + divisor };
  } else {
    return { div: quot, mod: rem };
  }
}

export const rem = (dividend, divisor) => quotRem(dividend, divisor).rem;
export const quot = (dividend, divisor) => quotRem(dividend, divisor).quot;
export const div = (dividend, divisor) => divMod(dividend, divisor).div;
export const mod = (dividend, divisor) => divMod(dividend, divisor).mod;
