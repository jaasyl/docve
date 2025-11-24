
import React from "react";
import SideNav from "../components/sidenav";
import PageHeader from "../components/pageheader";
import Tabs from "../components/tabs";
import SearchBar from "../components/searchbar";
import ShelvesTable from "../components/shelvestable";
import Pagination from "../components/pagination";


export default function MyShelves() {
return (
<div className="layout-root">
<SideNav />
<main className="layout-main">
<div className="layout-content">
<PageHeader />
<Tabs />
<SearchBar />
<ShelvesTable />
<Pagination />
</div>
</main>
</div>
);
}