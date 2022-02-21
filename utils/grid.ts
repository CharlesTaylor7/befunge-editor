import { List } from 'immutable'

export type Grid = {
  height: number
  width: number
  cells: List<number>
}

export const initialGrid: Grid = { width: 5, height: 5, cells: List() }

export function gridLookup(grid: Grid, i: number, j: number): string {
  const charCode = grid.cells.get(i + j * grid.height)
  if (charCode === undefined) return ' '
  return String.fromCharCode(charCode)
}

export function gridUpdate(grid: Grid, i: number, j: number, value: string): Grid {
  return {
    ...grid,
    cells: grid.cells.set(i + j * grid.height, value.charCodeAt(0)),
  }
}
