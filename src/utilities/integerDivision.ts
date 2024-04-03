// both 0 & -0 are equal to 0
const handleNegativeZero = (n: number) => (n === 0 ? 0 : n);

export const quotRem = (dividend: number, divisor: number) => {
  const rem = dividend % divisor;
  // Subtracting the remainder gurantees the division is a whole number
  const quot = handleNegativeZero((dividend - rem) / divisor);
  return { quot, rem };
};

export const divMod = (dividend: number, divisor: number) => {
  const { quot, rem } = quotRem(dividend, divisor);
  if (Math.sign(rem) === -Math.sign(divisor)) {
    return { div: quot - 1, mod: rem + divisor };
  } else {
    return { div: quot, mod: rem };
  }
};

type IntDivFun = (dividend: number, divisor: number) => number;
export const rem: IntDivFun = (dividend, divisor) => quotRem(dividend, divisor).rem;
export const quot: IntDivFun = (dividend, divisor) => quotRem(dividend, divisor).quot;
export const div: IntDivFun = (dividend, divisor) => divMod(dividend, divisor).div;
export const mod: IntDivFun = (dividend, divisor) => divMod(dividend, divisor).mod;
