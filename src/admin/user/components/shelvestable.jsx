import React from "react";
import "./shelvestable.css";

export default function ShelvesTable() {
  const rows = [
    { name: "Project Alpha Docs", type: "Personal", date: "2023-10-26", docs: 15 },
    { name: "Q4 Marketing Reports", type: "Personal", date: "2023-10-22", docs: 8 },
    { name: "Legal Contracts", type: "Personal", date: "2023-09-15", docs: 32 },
    { name: "Research Papers", type: "Personal", date: "2023-09-01", docs: 5 },
  ];

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
              <td className="name">{r.name}</td>
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
