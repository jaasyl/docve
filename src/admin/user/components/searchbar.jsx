import React, { useState, useEffect } from "react";
import "./searchbar.css";

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearch]);

  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          className="search-input"
          placeholder="Search shelves..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
