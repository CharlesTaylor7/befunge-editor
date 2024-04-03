import { useEffect, useState } from "react";

import type { AppState } from "@/types";
import { AppContext } from "@/context";
import defaultExecutionState from "@/utilities/defaultState";
import Befunge from "@/components/Befunge";

const initialAppState: AppState = {
  execution: defaultExecutionState,
  animationIntervalMillis: 200,
  mode: "edit",
  editMode: "text",
  gridEnabled: false,
  activeProgramIndex: 0,
  programs: [
    { name: "Factorial", code: ["&>:1-:v v *_$.@", " ^    _$>\\:^"] },
    { name: "Quine", code: ["01->1# +# :# 0# g# ,# :# 5# 8# *# 4# +# -# _@"] },
  ],
};

export default function App(props: Partial<AppState>) {
  const hook = useState({ ...initialAppState, ...props });
  useEffect(() => {
    Alpine.store('legacy', hook[0]); 
  }, []);
  return (
    <AppContext.Provider value={hook}>
      <Befunge />
    </AppContext.Provider>
  );
}
