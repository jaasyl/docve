import React from "react";
import "./shelvestable.css";

export default function ShelvesTable({ rows }) {

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
                  <button className="icon-btn"><span className="material-symbols-outlined">edit</span></button>
                  <button className="icon-btn"><span className="material-symbols-outlined">open_in_new</span></button>
                  <button className="icon-btn delete"><span className="material-symbols-outlined">delete</span></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
