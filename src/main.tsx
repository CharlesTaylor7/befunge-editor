import React from "react";
import ReactDOM from "react-dom/client";
import Alpine from "alpinejs";
import App from "@/components/App.tsx";
import "@/styles/tailwind.css";
import defaultExecutionState from "@/utilities/defaultState";

// suggested in the Alpine docs:
// make Alpine on window available for better DX
window.Alpine = Alpine;

Alpine.store('execution', defaultExecutionState);
Alpine.store('activeProgramIndex', 0);

Alpine.start();

ReactDOM.createRoot(document.getElementById("legacy-root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
