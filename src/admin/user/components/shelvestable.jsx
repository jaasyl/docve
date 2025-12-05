import React from "react";
import { useNavigate } from "react-router-dom";
import "./shelvestable.css";
import { deleteShelf, getShelfById } from "../../../services/Shelfapi";

export default function ShelvesTable({ rows, onRefresh, onEdit }) {
  const navigate = useNavigate();

  const handleDelete = async (shelfId, shelfName) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${shelfName}"?`);
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      await deleteShelf(shelfId, token);
      alert("Shelf deleted successfully!");

      // Refresh the table
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error("Error deleting shelf:", error);
      alert("Failed to delete shelf. Please try again.");
    }
  };

  const handleEdit = async (shelfId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const shelfData = await getShelfById(shelfId, token);

      // Pass shelf data to parent component
      if (onEdit) {
        onEdit(shelfData);
      }
    } catch (error) {
      console.error("Error fetching shelf details:", error);
      alert("Failed to load shelf details. Please try again.");
    }
  };

  const handleOpen = (shelfId) => {
    navigate(`/admin/shelf/${shelfId}`);
  };

  return (
    <div className="table-wrap">
      <table className="shelves-table">
        <thead>
          <tr>
            <th>Shelf Name</th>
            <th>Type</th>
            <th>Created Date</th>
            <th className="center"># of Documents</th>
            <th className="right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="name">
                {r.name}
                {r.hasError && (
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#dc2626", fontSize: "18px", marginLeft: "8px", verticalAlign: "middle" }}
                    title="Upload Failed"
                  >
                    error
                  </span>
                )}
              </td>
              <td>{r.type}</td>
              <td>{r.date}</td>
              <td className="center">{r.docs}</td>
              <td className="right">
                <div className="actions">
                  <button className="icon-btn" onClick={() => handleEdit(r.id)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className="icon-btn" onClick={() => handleOpen(r.id)}>
                    <span className="material-symbols-outlined">open_in_new</span>
                  </button>
                  <button className="icon-btn delete" onClick={() => handleDelete(r.id, r.name)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
