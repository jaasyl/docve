import React from "react";
import "./pageheader.css";

export default function PageHeader({ onCreateClick }) {
  return (
    <div className="page-header">
      <div className="page-title">
        <h1>My Shelves</h1>
        <p className="page-sub">Manage your personal and shared document collections.</p>
      </div>

      <button className="btn-primary" onClick={onCreateClick}>
        <span className="material-symbols-outlined">add</span>
        <span>Create Shelf</span>
      </button>
    </div>
  );
}
