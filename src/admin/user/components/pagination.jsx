import React from "react";
import "./pagination.css";

export default function Pagination() {
  return (
    <div className="pagination-row">
      <div className="pagination-info">
        Showing <strong>1</strong> to <strong>4</strong> of <strong>12</strong> Entries
      </div>

      <div className="pagination-controls">
        <button className="page-btn">Previous</button>
        <button className="page-btn">1</button>
        <button className="page-btn active">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">Next</button>
      </div>
    </div>
  );
}
