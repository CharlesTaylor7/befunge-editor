import React from "react";
import ReactDOM from "react-dom/client";
import Alpine from "alpinejs";
import App from "@/components/App.tsx";
import "@/styles/tailwind.css";

// suggested in the Alpine docs:
// make Alpine on window available for better DX
window.Alpine = Alpine;

Alpine.start();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
