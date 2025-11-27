import React from "react";
import SearchBar from "./SearchBar";
import ShelvesTable from "./shelvestable";
import Pagination from "./Pagination";

export default function PersonalShelvesView({ rows }) {
    return (
        <div className="card">
            <SearchBar />
            <ShelvesTable rows={rows} />
            <Pagination />
        </div>
    );
}
