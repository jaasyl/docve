import React, { useState, useRef } from "react";
import "./managedocument.css";

export default function ManageDocuments({ shelf, onUploadError }) {
  const [selectedShelf, setSelectedShelf] = useState(shelf || "");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  // ... (drag handlers remain same)

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file) => {
    if (file.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50MB limit.");
      return;
    }
    setFile(file);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;

    setUploadStatus("uploading");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      // Simulate error if file name contains "fail"
      if (file.name.toLowerCase().includes("fail") && progress === 50) {
        clearInterval(interval);
        setUploadStatus("error");
        if (onUploadError) onUploadError();
        return;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus("success");
      }
    }, 200);
  };

  const handleCancel = () => {
    setFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setTags("");
    setDescription("");
  };

  return (
    <div className="manage-doc-container">
      <div className="md-header">
        <h1 className="md-title">Upload New Document</h1>
        <p className="md-subtitle">Add a new document to one of your shelves for processing.</p>
      </div>

      <div className="md-section">
        <label className="md-label">Shelf</label>
        <select
          className="md-select"
          value={selectedShelf}
          onChange={(e) => setSelectedShelf(e.target.value)}
        >
          <option value="" disabled>Select a destination shelf</option>
          <option value="Project Alpha Docs">Project Alpha Docs</option>
          <option value="Q4 Marketing Reports">Q4 Marketing Reports</option>
          <option value="Legal Contracts">Legal Contracts</option>
          <option value="Research Papers">Research Papers</option>
          {/* Add more options or map from props if available */}
        </select>
      </div>

      <div className="md-section">
        <div
          className={`upload-zone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined upload-icon">cloud_upload</span>
          <div className="upload-text">Drag & drop your PDF, DOCX, or TXT file here</div>
          <div className="upload-subtext">Max file size: 50MB</div>
          <button className="btn-choose-file" onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}>
            Or Choose File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".pdf,.docx,.txt"
            onChange={handleFileSelect}
          />
        </div>

        {file && (
          <div className="upload-progress-container">
            <div className="upload-filename">
              {uploadStatus === "uploading" ? `Uploading \`${file.name}\`...` : file.name}
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="success-message">
            <span className="material-symbols-outlined success-icon">check_circle</span>
            <div className="success-text">
              <span className="success-title">Document Added</span>
              Success! `{file?.name}` has been added and is now being indexed.
            </div>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="error-message" style={{ marginTop: "16px", backgroundColor: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "6px", padding: "12px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <span className="material-symbols-outlined error-icon" style={{ color: "#dc2626", fontSize: "20px" }}>error</span>
            <div className="error-text" style={{ fontSize: "14px", color: "#991b1b" }}>
              <span className="error-title" style={{ fontWeight: "600", display: "block", marginBottom: "2px" }}>Upload Failed</span>
              There was an error uploading `{file?.name}`. Please try again.
            </div>
          </div>
        )}
      </div>

      <div className="md-section">
        <label className="md-label">Tags (Optional)</label>
        <input
          type="text"
          className="md-input"
          placeholder="e.g., Q4-report, marketing, internal"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="md-section">
        <label className="md-label">Description (Optional)</label>
        <textarea
          className="md-textarea"
          placeholder="Add a brief summary of the document's content..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="md-footer">
        <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
        <button
          className="btn-upload"
          onClick={handleUpload}
          disabled={!file || uploadStatus === "uploading" || uploadStatus === "success"}
        >
          Upload & Index
        </button>
      </div>
    </div>
  );
}
