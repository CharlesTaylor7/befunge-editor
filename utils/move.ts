import * as R from 'ramda'
import { mod } from '@/utils/integerDivision'
import { Direction } from '@/utils/befunge'

// @ts-ignore
const xLens = R.lensProp('x')
// @ts-ignore
const yLens = R.lensProp('y')

export type MoveParams = {
  direction: Direction
  dimensions: { width: number; height: number }
  jumpSize: number
}
export default ({ direction, dimensions, jumpSize }: MoveParams) => {
  const { width, height } = dimensions
  switch (direction) {
    case 'R':
      // @ts-ignore
      return R.over(xLens, (x) => mod(x + jumpSize, width))
    case 'D':
      // @ts-ignore
      return R.over(yLens, (y) => mod(y + jumpSize, height))
    case 'L':
      // @ts-ignore
      return R.over(xLens, (x) => mod(x - jumpSize, width))
    case 'U':
      // @ts-ignore
      return R.over(yLens, (y) => mod(y - jumpSize, height))
    default:
      throw new Error('Unrecognized direction!')
  }
}
