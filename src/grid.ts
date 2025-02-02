import * as R from "ramda";

export type Grid = Array<Array<string>>;
export type Position = { x: number; y: number };

export function gridLookup(grid: Grid, position: Position): string {
  const row = grid[position.y];
  if (!row) {
    return " ";
  }
  const value = row[position.x];
  if (value === undefined || value === "") return " ";
  return value;
}

export function gridUpdate(grid: Grid, position: Position, value: number | string) {
  if (value === undefined || value === null) {
    grid[position.y][position.x] = "";
    return;
  }
  if (typeof value === "string") {
    if (value.length > 1) throw Error();
    grid[position.y][position.x] = value;
    return;
  }
  if (typeof value === "number") {
    grid[position.y][position.x] = String.fromCharCode(value);
    return;
  } else {
    throw Error();
  }
}

export type Dimensions = { height: number; width: number };

type GridAndDimensions = { grid: Grid; dimensions: Dimensions };

export function gridInit(program: string[]): GridAndDimensions {
  const height = program.length;
  const width = R.reduce(
    R.maxBy((line: string) => line.length),
    "",
    program,
  ).length;
  const dimensions = { height, width };

  const grid = Array.from({ length: height }, (_, j) => Array.from({ length: width }, (_, i) => program[j][i]));
  return { grid, dimensions };
}

export function gridProgram(grid: Grid, dimensions: Dimensions): string {
  const array = [];
  for (let j = 0; j < dimensions.height; j++) {
    for (let i = 0; i < dimensions.width; i++) {
      array.push(gridLookup(grid, { x: i, y: j }));
    }
    array.push("\n");
  }
  return array.join("");
}
