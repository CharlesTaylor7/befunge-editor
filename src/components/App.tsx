import type { Context } from "react";
import { createContext, useState } from "react";

import type { AppState } from "@/types";
import { AppContext } from "@/context";
import defaultExecutionState from "@/utilities/defaultState";
import Befunge from "@/components/Befunge";
import { gridInit } from "@/grid";

const initialAppState: AppState = {
  execution: defaultExecutionState,
  animationIntervalMillis: 200,
  count: 0,
  mode: "edit",
  editMode: "text",
  activeProgramIndex: 0,
  programs: [
    { name: "Factorial", code: ["&>:1-:v v *_$.@", " ^    _$>\\:^"] },
    { name: "Quine", code: ["01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@"] },
  ],
};

export default function App(props: Partial<AppState>) {
  const hook = useState({ ...initialAppState, ...props });
  return (
    <AppContext.Provider value={hook}>
      <Befunge />
    </AppContext.Provider>
  );
}
