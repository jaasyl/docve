import React from "react";
import ReactDOM from "react-dom/client";

// run theme init BEFORE React renders:
(function initTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else if (saved === "light") document.documentElement.classList.remove("dark");
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();

import App from "./App.jsx";
import "./index.css";     // <-- REQUIRED
import "./styles.css";    // <-- YOUR THEME VARIABLES

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
