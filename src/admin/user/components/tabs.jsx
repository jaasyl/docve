import React from "react";
import "./tabs.css";

export default function Tabs({ activeTab = "personal", onTabChange }) {
  return (
    <div className="tabs-row">
      <button
        className={`tab ${activeTab === "personal" ? "active" : ""}`}
        onClick={() => onTabChange?.("personal")}
      >
        Personal Shelves (12)
      </button>
      <button
        className={`tab ${activeTab === "shared" ? "active" : ""}`}
        onClick={() => onTabChange?.("shared")}
      >
        Shared Shelves (3)
      </button>
    </div>
  );
}
