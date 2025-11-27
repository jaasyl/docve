import React, { useState } from "react";

// Shared Sidebar
import SideNav from "../../user/components/sidenav";

// NEW Dashboard UI
import SuperAdminDashboard from "./superadmin-dashboard";

// If a shelf is selected → open document manager
import ManageDocuments from "../../user/components/ManageDocument";

// Styles (your global layout css)
import "../../user/pages/myshelf.css";

import ShelvesView from "../../user/components/ShelvesView";

export default function SuperAdmin() {
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [view, setView] = useState("dashboard");
  const [rows, setRows] = useState([
    { name: "Project Alpha Docs", type: "Personal", date: "2023-10-26", docs: 15 },
    { name: "Q4 Marketing Reports", type: "Personal", date: "2023-10-22", docs: 8 },
    { name: "Legal Contracts", type: "Personal", date: "2023-09-15", docs: 32 },
    { name: "Research Papers", type: "Personal", date: "2023-09-01", docs: 5 },
  ]);

  const handleCreateShelf = (newShelf) => {
    const shelfData = {
      ...newShelf,
      date: new Date().toISOString().split('T')[0],
      docs: 0
    };
    setRows([shelfData, ...rows]);
  };

  const handleUploadError = () => {
    if (!selectedShelf) return;
    setRows(prevRows => prevRows.map(row =>
      row.name === selectedShelf ? { ...row, hasError: true } : row
    ));
  };

  const handleShelfSelect = (shelf) => {
    if (!shelf) {
      setSelectedShelf(null);
      setView("dashboard");
    } else {
      setSelectedShelf(shelf);
    }
  };

  const handleMyShelvesClick = () => {
    setSelectedShelf(null);
    setView("shelves");
  };

  return (
    <div className="app-root">

      {/* Left Sidebar */}
      <SideNav
        onShelfSelect={handleShelfSelect}
        onMyShelvesClick={handleMyShelvesClick}
        activeTab={selectedShelf ? "" : view === "shelves" ? "myshelves" : "dashboard"}
      />

      {/* Right Content */}
      <main className="main-content">
        <div className="page-inner">

          {/* If a shelf is selected → open manage page */}
          {selectedShelf ? (
            <ManageDocuments shelf={selectedShelf} onUploadError={handleUploadError} />
          ) : view === "shelves" ? (
            <ShelvesView rows={rows} onCreateShelf={handleCreateShelf} />
          ) : (
            <SuperAdminDashboard />
          )}

        </div>
      </main>
    </div>
  );
}
