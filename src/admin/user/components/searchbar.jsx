/* src/admin/user/components/SearchBar.jsx */
import React from "react";
import "./searchbar.css";


export default function SearchBar(){
return (
<div className="toolbar">
<div className="search-wrap">
<span className="material-symbols-outlined search-icon" aria-hidden="true">search</span>
<input className="search-input" placeholder="Search shelves..." type="text" aria-label="Search shelves" />
</div>
</div>
)
}