/* src/admin/user/components/ShelvesTable.jsx */
import React from "react";

import "./shelvestable.css";

export default function ShelvesTable(){
const rows = [
{ name: "Project Alpha Docs", type: "Personal", date: "2023-10-26", docs: 15 },
{ name: "Q4 Marketing Reports", type: "Personal", date: "2023-10-22", docs: 8 },
{ name: "Legal Contracts", type: "Personal", date: "2023-09-15", docs: 32 },
{ name: "Research Papers", type: "Personal", date: "2023-09-01", docs: 5 },
];


return (
<div className="table-wrap">
<div className="table-responsive">
<table className="shelves-table" role="table">
<thead>
<tr>
<th scope="col">Shelf Name</th>
<th scope="col">Type</th>
<th scope="col">Created Date</th>
<th className="text-center" scope="col"># of Documents</th>
<th className="text-right" scope="col">Actions</th>
</tr>
</thead>
<tbody>
{rows.map((r, i) => (
<tr key={i} className="table-row">
<td className="name">{r.name}</td>
<td>{r.type}</td>
<td>{r.date}</td>
<td className="text-center">{r.docs}</td>
<td className="text-right">
<div className="actions">
<button className="icon-btn" type="button" aria-label={`Edit ${r.name}`}><span className="material-symbols-outlined" aria-hidden="true">edit</span></button>
<button className="icon-btn" type="button" aria-label={`Open ${r.name}`}><span className="material-symbols-outlined" aria-hidden="true">open_in_new</span></button>
<button className="icon-btn danger" type="button" aria-label={`Delete ${r.name}`}><span className="material-symbols-outlined" aria-hidden="true">delete</span></button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)
}