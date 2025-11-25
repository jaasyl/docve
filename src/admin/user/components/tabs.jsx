import React from "react";
import "./tabs.css";

export default function Tabs() {
  return (
    <div className="tabs-row">
      <button className="tab active">Personal Shelves (12)</button>
      <button className="tab">Shared Shelves (3)</button>
    </div>
  );
}
