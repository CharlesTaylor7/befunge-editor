import { List } from 'immutable'
import { quotRem } from './integerDivision'

export type Grid = {
  height: number
  width: number
  cells: List<number>
}

export const initialGrid: Grid = { width: 5, height: 5, cells: List() }

export function gridLookup(grid: Grid, i: number, j: number): string {
  const charCode = grid.cells.get(gridIndex(grid, i, j))
  if (charCode === undefined) return ' '
  return String.fromCharCode(charCode)
}

export function gridUpdate(grid: Grid, i: number, j: number, value: string): Grid {
  return {
    ...grid,
    cells: grid.cells.set(gridIndex(grid, i, j), value.charCodeAt(0)),
  }
}

export function gridIndex(grid: Grid, i: number, j: number): number {
  return i + j * grid.width
}

export function fromIndex(grid: Grid, index: number): { i: number; j: number } {
  const { quot, rem } = quotRem(index, grid.width)
  return { i: rem, j: quot }
}
