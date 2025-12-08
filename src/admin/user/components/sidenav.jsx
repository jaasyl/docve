import React, { useState, useEffect } from "react";
import "./sidenav.css";
import { getAllShelves } from "../../../services/shelvesApi";

export default function SideNav({
  onShelfSelect,
  onMyShelvesClick,
  onDashboardClick,
  activeTab,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPersonal, setOpenPersonal] = useState(false);
  const [shelves, setShelves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch shelves on component mount
  useEffect(() => {
    fetchShelves();
  }, []);

  /**
   * Fetch all shelves from the backend API
   */
  const fetchShelves = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllShelves();
      setShelves(data || []);
    } catch (err) {
      console.error("Error fetching shelves:", err);
      setError("Failed to load shelves");
      setShelves([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  /**
   * Handle shelf selection - pass the entire shelf object
   */
  const handleShelfClick = (shelf) => {
    if (onShelfSelect) {
      onShelfSelect(shelf);
    }
  };

  return (
    <aside className="sidenav">
      <div>
        <div className="brand" onClick={onDashboardClick}>
          <div className="brand-icon" aria-hidden>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" fill="currentColor" opacity="0.2" />
              <path d="M24 4L6 14M24 4L42 14M24 4V24M6 14V34M6 14L24 24M42 14V34M42 14L24 24M6 34L24 44M6 34L24 24M24 44L42 34M24 44V24M42 34L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                  {loading ? (
                    <div className="dropdown-sub-item" style={{ opacity: 0.6, cursor: "default" }}>
                      Loading shelves...
                    </div>
                  ) : error ? (
                    <div className="dropdown-sub-item" style={{ opacity: 0.6, cursor: "default", color: "#dc3545" }}>
                      {error}
                    </div>
                  ) : shelves.length === 0 ? (
                    <div className="dropdown-sub-item" style={{ opacity: 0.6, cursor: "default" }}>
                      No shelves available
                    </div>
                  ) : (
                    shelves.map((shelf) => (
                      <div
                        key={shelf.id}
                        className="dropdown-sub-item"
                        onClick={() => handleShelfClick(shelf)}
                      >
                        {shelf.name}
                      </div>
                    ))
                  )}
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
