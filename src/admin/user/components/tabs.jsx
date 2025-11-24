/* src/admin/user/components/Tabs.jsx */
import React from "react";
import "./tabs.css";


export default function Tabs(){
return (
<div className="tabs-root" role="tablist">
<a className="tab active" href="#" onClick={(e)=>e.preventDefault()}>Personal Shelves (12)</a>
<a className="tab" href="#" onClick={(e)=>e.preventDefault()}>Shared Shelves (3)</a>
</div>
)
}