import { useState } from "react";

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
  };

export default function App(props: Partial<AppState>) {
  const hook = useState({ ...initialAppState, ...props });
  return (
    <AppContext.Provider value={hook}>
      <Befunge />
    </AppContext.Provider>
  );
}
