import React from "react";
import "./managedocument.css";

export default function ManageDocuments({ shelf }) {
  return (
    <div className="manage-doc-box">
      <h2 className="md-title">
        Managing: {shelf === "personal" ? "Personal Shelf" : "Shared Shelf"}
      </h2>

      <p className="md-sub">
        Upload, remove or manage files here.
      </p>

      <div className="md-placeholder">
        <p>This is where document management UI will go...</p>
      </div>
    </div>
  );
}
