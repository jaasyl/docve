import React, { useState } from "react";

// Shared Sidebar
import SideNav from "../../user/components/SideNav";

// NEW Dashboard UI
import SuperAdminDashboard from "./superadmin-dashboard";

// If a shelf is selected → open document manager
import ManageDocuments from "../../user/components/ManageDocument";

// Styles (your global layout css)
import "../../user/pages/myshelf.css";

export default function SuperAdmin() {
  const [selectedShelf, setSelectedShelf] = useState(null);

  return (
    <div className="app-root">

      {/* Left Sidebar */}
      <SideNav onShelfSelect={setSelectedShelf} />

      {/* Right Content */}
      <main className="main-content">
        <div className="page-inner">

          {/* If a shelf is selected → open manage page */}
          {selectedShelf ? (
            <ManageDocuments shelf={selectedShelf} />
          ) : (
            <SuperAdminDashboard />
          )}

        </div>
      </main>
    </div>
  );
}
