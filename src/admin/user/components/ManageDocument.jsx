import React, { useState, useRef, useEffect } from "react";
import "./managedocument.css";
import { getAllShelves } from "../../../services/shelvesApi";
import {
  uploadDocument,
  getDocumentsByShelf,
  deleteDocument
} from "../../../services/documentsApi";

export default function ManageDocuments({ shelf, onUploadError }) {
  // State management
  const [shelves, setShelves] = useState([]);
  const [selectedShelfId, setSelectedShelfId] = useState(""); // Store only ID
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  // Fetch shelves on component mount
  useEffect(() => {
    fetchShelves();
  }, []);

  // Update selected shelf when prop changes
  useEffect(() => {
    if (shelf) {
      // Extract ID from shelf object or use directly if it's already an ID
      const shelfId = typeof shelf === 'object' ? shelf.id : shelf;
      setSelectedShelfId(shelfId);
    }
  }, [shelf]);

  // Fetch documents when shelf is selected
  useEffect(() => {
    if (selectedShelfId) {
      fetchDocuments(selectedShelfId);
    }
  }, [selectedShelfId]);

  /**
   * Fetch all shelves from backend
   */
  const fetchShelves = async () => {
    try {
      setLoading(true);
      const data = await getAllShelves();
      setShelves(data || []);
    } catch (err) {
      console.error("Error fetching shelves:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch documents for selected shelf - MUST use shelf ID only
   */
  const fetchDocuments = async (shelfId) => {
    try {
      setDocumentsLoading(true);
      // Ensure we're passing only the ID, not the object
      const id = typeof shelfId === 'object' ? shelfId.id : shelfId;
      const data = await getDocumentsByShelf(id);
      setDocuments(data || []);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setDocuments([]);
    } finally {
      setDocumentsLoading(false);
    }
  };

  // Drag and drop handlers
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
    setErrorMessage("");
  };

  /**
   * Handle real document upload to backend
   */
  const handleUpload = async () => {
    if (!file || !selectedShelfId) {
      alert("Please select a shelf and file to upload.");
      return;
    }

    try {
      setUploadStatus("uploading");
      setErrorMessage("");

      // CRITICAL: Ensure we pass only the shelf ID, not the object
      const shelfId = typeof selectedShelfId === 'object' ? selectedShelfId.id : selectedShelfId;

      // Upload document with progress tracking
      const uploadedDoc = await uploadDocument(
        file,
        shelfId, // Pass only the ID
        tags,
        description,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      // Upload successful
      setUploadStatus("success");
      setUploadProgress(100);

      // Refresh document list
      await fetchDocuments(shelfId);

      // Reset form after 2 seconds
      setTimeout(() => {
        handleCancel();
      }, 2000);

    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("error");
      setErrorMessage(err.response?.data?.message || "Upload failed. Please try again.");

      if (onUploadError) {
        onUploadError(err);
      }
    }
  };

  /**
   * Handle document deletion
   */
  const handleDeleteDocument = async (documentId, documentName) => {
    if (!window.confirm(`Are you sure you want to delete "${documentName}"?`)) {
      return;
    }

    try {
      await deleteDocument(documentId);
      // Refresh document list
      await fetchDocuments(selectedShelfId);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete document. Please try again.");
    }
  };

  const handleCancel = () => {
    setFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setTags("");
    setDescription("");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Format date to readable string
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'indexed':
      case 'success':
        return '#10b981';
      case 'failed':
      case 'error':
        return '#ef4444';
      case 'removed':
        return '#6b7280';
      case 'processing':
      case 'uploading':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
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
          value={selectedShelfId}
          onChange={(e) => setSelectedShelfId(e.target.value)}
          disabled={loading}
        >
          <option value="" disabled>
            {loading ? "Loading shelves..." : "Select a destination shelf"}
          </option>
          {shelves.map((shelf) => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.name}
            </option>
          ))}
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
              {errorMessage || `There was an error uploading \`${file?.name}\`. Please try again.`}
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
          disabled={!file || !selectedShelfId || uploadStatus === "uploading" || uploadStatus === "success"}
        >
          {uploadStatus === "uploading" ? "Uploading..." : "Upload & Index"}
        </button>
      </div>

      {/* Document List Section */}
      {selectedShelfId && (
        <div className="md-section" style={{ marginTop: "32px" }}>
          <div className="md-header" style={{ marginBottom: "16px" }}>
            <h2 className="md-title" style={{ fontSize: "18px" }}>Documents in this Shelf</h2>
            <p className="md-subtitle" style={{ fontSize: "13px" }}>
              {documentsLoading ? "Loading documents..." : `${documents.length} document(s) found`}
            </p>
          </div>

          {documentsLoading ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px", color: "#6b7280", backgroundColor: "#f9fafb", borderRadius: "8px" }}>
              No documents found in this shelf. Upload your first document above!
            </div>
          ) : (
            <div className="documents-table-container">
              <table className="documents-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Document Name</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Upload Date</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#374151" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#111827" }}>
                        {doc.name || doc.fileName || "Untitled Document"}
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#6b7280" }}>
                        {formatDate(doc.uploadedAt || doc.createdAt)}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500",
                          backgroundColor: `${getStatusColor(doc.status)}20`,
                          color: getStatusColor(doc.status)
                        }}>
                          {doc.status || "Unknown"}
                        </span>
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => handleDeleteDocument(doc.id, doc.name || doc.fileName)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#ef4444",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            transition: "background-color 0.2s"
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#fee2e2"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
