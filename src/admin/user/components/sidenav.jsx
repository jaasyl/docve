import React, { useState } from "react";
import "./sidenav.css";

export default function SideNav({
  onShelfSelect,
  onMyShelvesClick,
  onDashboardClick,
  activeTab,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const shelves = [
    "Project Alpha Docs",
    "Q4 Marketing Reports",
    "Legal Contracts",
    "Research Papers",
  ];

  return (
    <aside className="sidenav">
        <div>
          <div className="brand" onClick={onDashboardClick}>
          <div className="brand-icon" aria-hidden>
            <svg viewBox="0 0 48 48">
              <path d="M24 45.8096C19.6865 ... Z" fill="currentColor" />
            </svg>
          </div>

          <div className="brand-text">
            <div className="brand-title">Docve</div>
            <div className="brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="nav-list">

          <div
            onClick={onDashboardClick}
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <p>Admin Dashboard</p>
          </div>



          <div
            className={`nav-item ${activeTab === "myshelves" ? "active" : ""}`}
            onClick={onMyShelvesClick}
            style={{ cursor: "pointer" }}
          >
            <span className="material-symbols-outlined">folder</span>
            <span>My Shelves</span>
          </div>


          {/* Manage Document */}
          <div className="nav-item dropdown-header" onClick={toggleDropdown}>
            <span className="material-symbols-outlined">description</span>
            <span>Manage Document</span>
            <span className="material-symbols-outlined dropdown-arrow">
              {openDropdown ? "expand_less" : "expand_more"}
            </span>
          </div>

          {openDropdown && (
            <div className="dropdown-menu">

              {/* Personal Shelf */}
              <div
                className="dropdown-item"
                onClick={() => setOpenPersonal(!openPersonal)}
              >
                Personal Shelf
                <span className="material-symbols-outlined dropdown-arrow">
                  {openPersonal ? "expand_less" : "expand_more"}
                </span>
              </div>

              {/* Nested shelf list */}
              {openPersonal && (
                <div className="nested-shelves">
                  {shelves.map((shelf, index) => (
                    <div
                      key={index}
                      className="dropdown-sub-item"
                      onClick={() => onShelfSelect(shelf)}
                    >
                      {shelf}
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          <a className="nav-item" href="#">
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </a>

          <a className="nav-item" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <div className="nav-bottom">
        <a className="nav-item" href="#">
          <span className="material-symbols-outlined">help</span>
          <span>Help</span>
        </a>

        <a className="nav-item" href="#">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}
