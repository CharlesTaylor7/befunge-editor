import type { ExecutionState, Program } from "@/types";
import Stack from "@/utilities/stack";
import { emptyGrid } from "@/grid";

export const initialPrograms: Array<Program> = [
    { name: "Factorial", code: ["&>:1-:v v *_$.@", " ^    _$>\\:^"] },
    { name: "Quine", code: ["01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@"] },
  ];


export const initialExecutionState: ExecutionState = {
  executionPointer: { x: 0, y: 0 },
  // type heading = 'Up' | 'Right' | 'Down' | 'Left'
  heading: "Right",
  // grid: { [cellId: string]: instruction }
  // where cell ids are of the form "{i}-{j}"
  grid: emptyGrid,
  dimensions: { height: 0, width: 0 },
  // stack<int>
  stack: Stack.empty,
  console: "",
  activeBridge: false,
  executionComplete: false,
  stringMode: false,
  // false | 'Number' | 'Character'
  pendingInput: false,
};
