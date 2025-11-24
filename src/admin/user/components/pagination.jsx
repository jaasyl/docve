/* src/admin/user/components/Pagination.jsx */
import React from "react";



export default function Pagination(){
return (
<div className="pagination-root">
<span className="summary">Showing <strong>1</strong> to <strong>4</strong> of <strong>12</strong> Entries</span>
<div className="page-controls" role="navigation" aria-label="Pagination">
<a className="page-btn" href="#" onClick={(e)=>e.preventDefault()}>Previous</a>
<a className="page-btn" href="#" onClick={(e)=>e.preventDefault()}>1</a>
<a className="page-btn active" href="#" onClick={(e)=>e.preventDefault()}>2</a>
<a className="page-btn" href="#" onClick={(e)=>e.preventDefault()}>3</a>
<a className="page-btn" href="#" onClick={(e)=>e.preventDefault()}>Next</a>
</div>
</div>
)
}