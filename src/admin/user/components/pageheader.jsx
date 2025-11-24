// ---------------------- src/admin/user/components/PageHeader.jsx ----------------------
import React from "react";
import "./pageheader.css";


export default function PageHeader() {
return (
<div className="page-heading">
<div>
<h2>My Shelves</h2>
<p>Manage your personal and shared document collections.</p>
</div>
<button className="btn-primary">
<span className="material-symbols-outlined">add</span>
Create Shelf
</button>
</div>
);
}