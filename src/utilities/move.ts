import * as R from "ramda";
import type { Lens } from "ramda";
import { mod } from "@/utilities/integerDivision";

type Location = { x: number; y: number };
const xLens: Lens<Location, number> = R.lensProp("x");
const yLens: Lens<Location, number> = R.lensProp("y");

type Direction = "Up" | "Right" | "Down" | "Left";

type Dimensions = {
  width: number;
  height: number;
};

type Args = {
  direction: Direction;
  dimensions: Dimensions;
  jumpSize: number;
};

export default function move(args: Args): (loc: Location) => Location {
  const { direction, dimensions, jumpSize = 1 } = args;
  const { width, height } = dimensions;
  switch (direction) {
    case "Right":
      return R.over(xLens, (x) => mod(x + jumpSize, width));
    case "Down":
      return R.over(yLens, (y) => mod(y + jumpSize, height));
    case "Left":
      return R.over(xLens, (x) => mod(x - jumpSize, width));
    case "Up":
      return R.over(yLens, (y) => mod(y - jumpSize, height));
    default:
      throw new Error("Unrecognized direction!");
  }
}
