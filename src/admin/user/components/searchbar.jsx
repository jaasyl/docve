import React from "react";
import "./searchbar.css";

export default function SearchBar() {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="material-symbols-outlined search-icon">search</span>
        <input className="search-input" placeholder="Search shelves..." />
      </div>
    </div>
  );
}
