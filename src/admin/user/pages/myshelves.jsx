import React, { useState } from "react";
import SideNav from "../components/SideNav";
import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
import SearchBar from "../components/SearchBar";
import ShelvesTable from "../components/shelvestable";
import Pagination from "../components/Pagination";
import ManageDocuments from "../components/ManageDocument"; // NEW


import "./myshelf.css";



export default function MyShelves() {
  const [selectedShelf, setSelectedShelf] = useState(null);

  return (
    <div className="app-root">
      {/* Pass callback to sidebar */}
      <SideNav onShelfSelect={setSelectedShelf} />

      <main className="main-content">
        <div className="page-inner">
          {/* If user clicked a shelf → show ManageDocuments */}
          {selectedShelf ? (
            <ManageDocuments shelf={selectedShelf} />
          ) : (
            <>
              <PageHeader />
              <Tabs />
              <div className="card">
                <SearchBar />
                <ShelvesTable />
                <Pagination />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
