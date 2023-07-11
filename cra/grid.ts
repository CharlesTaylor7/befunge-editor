import * as R from 'ramda'
import { Map } from 'immutable'

// ${i}-${j}: character code
export type Grid = Map<string, number | string>
export type Position = { x: number; y: number }

export function gridLookup(grid: Grid, position: Position): string {
  const value = grid.get(toIndex(position))
  if (value === undefined || value === '') return ' '
  if (typeof value === 'number') return String.fromCharCode(value)
  if (typeof value === 'string') return value
  throw Error()
}

export function gridUpdate(grid: Grid, position: Position, value: number | string): Grid {
  if (value === undefined || value === null) {
    return grid.delete(toIndex(position))
  }
  if (typeof value === 'string') {
    if (value.length > 1) throw Error()
    return grid.set(toIndex(position), value.charCodeAt(0))
  }
  if (typeof value === 'number') {
    return grid.set(toIndex(position), value)
  }
}

function toIndex({ x, y }: Position) {
  return `${x}-${y}`
}

export type Dimensions = { height: number; width: number }

type FromProgramResult = { grid: Grid; dimensions: Dimensions }

export function gridInit(program: string[]): FromProgramResult {
  const height = program.length
  const width = program.reduce(R.maxBy((line) => line.length)).length
  const dimensions = { height, width }

  let grid = Map()
  for (let j = 0; j < height; j++) {
    const line = program[j]
    for (let i = 0; i < width; i++) {
      grid = gridUpdate(grid, { x: i, y: j }, line[i])
    }
  }

  return { grid, dimensions }
}

export const emptyGrid = Map();
