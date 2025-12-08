import React, { useState } from "react";
import SideNav from "../components/sidenav";
import ShelvesView from "../components/ShelvesView";
import ManageDocuments from "../components/ManageDocument";
import AdminDashboard from "../components/AdminDashboard";


import "./myshelf.css";



export default function MyShelves() {
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
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

  const handleDashboardClick = () => {
    setActiveTab("dashboard");
    setSelectedShelf(null);
  };

  const handleMyShelvesClick = () => {
    setActiveTab("myshelves");
    setSelectedShelf(null);
  };

  /**
   * Handle shelf selection from SideNav
   * Receives shelf object with {id, name, ...} from API
   */
  const handleShelfSelect = (shelf) => {
    // Store the entire shelf object (contains id, name, etc.)
    setSelectedShelf(shelf);
    setActiveTab("shelf");
  };

  let content = null;

  if (activeTab === "dashboard") {
    content = <AdminDashboard />;
  } else if (selectedShelf) {
    content = <ManageDocuments shelf={selectedShelf} onUploadError={handleUploadError} />;
  } else {
    content = <ShelvesView rows={rows} onCreateShelf={handleCreateShelf} />;
  }

  return (
    <div className="app-root">
      <SideNav
        onShelfSelect={handleShelfSelect}
        onMyShelvesClick={handleMyShelvesClick}
        onDashboardClick={handleDashboardClick}
        activeTab={activeTab}
      />

      <main className="main-content">
        <div className="page-inner">{content}</div>
      </main>
    </div>
  );
}
