import React, { useState } from "react";
import {
  getDocuments,
  deleteDocument
} from "../services/api"; // Make sure this path is correct!!

const ApiDemo = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDocuments = async () => {
    console.log("➡️ Fetch Documents button clicked");
    
    setLoading(true);
    setError("");

    try {
      console.log("➡️ Calling getDocuments()...");
      const docs = await getDocuments();
      console.log("📌 API Response:", docs);

      if (!docs) {
        console.warn("⚠️ API returned undefined/null");
        setDocuments([]);
      } else if (!Array.isArray(docs)) {
        console.warn("⚠️ API did NOT return an array:", docs);
        setDocuments([]);
      } else {
        setDocuments(docs);
      }

    } catch (err) {
      console.error("❌ API error:", err);
      setError(err.message || "Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log("➡️ Delete clicked for ID:", id);

    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      setError(err.message || "Failed to delete document");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg space-y-6">
      <h1 className="text-2xl font-bold">API Test Demo</h1>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-600 rounded">
          {error}
        </div>
      )}

      <button
        onClick={fetchDocuments}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Loading..." : "Fetch Documents"}
      </button>

      <div className="mt-4">
        {documents.length === 0 ? (
          <p className="text-gray-500 italic">No documents found.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border rounded">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold">
                    {doc.title || "Untitled Document"}
                  </p>
                  <p className="text-sm text-gray-500">ID: {doc.id}</p>
                </div>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApiDemo;
