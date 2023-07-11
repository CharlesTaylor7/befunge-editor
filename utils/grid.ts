import { Map } from 'immutable'
import { quotRem } from '@/utils/integerDivision'

export type Grid = {
  height: number
  width: number
  cells: Map<string, number>
}

export const initialGrid: Grid = { width: 5, height: 5, cells: Map() }

export function gridLookup(grid: Grid, i: number, j: number): string {
  const charCode = grid.cells.get(`${i}-${j}`)
  if (charCode === undefined) return ' '
  return String.fromCharCode(charCode)
}

export function gridUpdate(grid: Grid, i: number, j: number, value: string): Grid {
  return {
    ...grid,
    cells: grid.cells.set(`${i}-${j}`, value.charCodeAt(0)),
  }
}
