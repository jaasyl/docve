import "./Docling Sidebar UI.css";
import ThemeToggle from "./ThemeToggle";

export default function DoclingSidebarUI() {
  return (
    <aside className="docling-sidebar">
      {/* SIDEBAR HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="material-symbols-outlined logo-icon">data_object</span>
          <h1 className="sidebar-title">Docling</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="sidebar-scroll">

        {/* ================= SHELVES ================= */}
        <div className="section">
          <div className="section-header-row">
            <h2 className="section-title">SHELVES</h2>
            <span className="material-symbols-outlined icon">expand_more</span>
          </div>

          {/* Tabs */}
          <div className="toggle-tabs">
            <label className="tab">
              Personal
              <input type="radio" name="shelf-type" defaultChecked />
            </label>

            <label className="tab">
              Shared
              <input type="radio" name="shelf-type" />
            </label>
          </div>

          {/* Folder */}
          <div className="folder-row active">
            <span className="material-symbols-outlined folder-icon">folder</span>
            <p className="folder-name">Project Phoenix</p>
            <span className="material-symbols-outlined arrow">expand_more</span>
          </div>

          {/* File List */}
          <div className="file-tree">
            <div className="file-item">
              <div className="file-icon-wrap">
                <span className="material-symbols-outlined pdf-icon">picture_as_pdf</span>
              </div>

              <div className="file-info">
                <p>Annual-Report-2023.pdf</p>
                <div className="file-status">
                  <span className="ready-dot"></span>
                  <p>Ready</p>
                </div>
              </div>
            </div>

            <div className="file-item">
              <div className="file-icon-wrap">
                <span className="material-symbols-outlined doc-icon">description</span>
              </div>

              <div className="file-info">
                <p>Meeting_Notes_Q1.docx</p>
                <div className="file-status">
                  <span className="processing-dot"></span>
                  <p>Processing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Another folder */}
          <div className="folder-row">
            <span className="material-symbols-outlined folder-icon">folder_open</span>
            <p className="folder-name">Q4 Financials</p>
            <span className="material-symbols-outlined arrow">chevron_right</span>
          </div>
        </div>

        {/* ================= GLOBAL CHAT HISTORY ================= */}
        <div className="section">
          <div className="section-header-row">
            <h2 className="section-title">GLOBAL CHAT HISTORY</h2>
            <span className="material-symbols-outlined icon">expand_more</span>
          </div>

          <div className="history-list">

            <div className="history-item">
              <p className="history-title">Summary of Annual Report</p>
              <div className="history-meta">
                <p className="history-time">5 hours ago</p>

                <div className="bubble-tag">
                  <span className="material-symbols-outlined tag-icon">folder</span>
                  <p>Project Phoenix</p>
                </div>
              </div>
            </div>

            <div className="history-item">
              <p className="history-title">Key points from Q1 notes</p>
              <div className="history-meta">
                <p className="history-time">2 days ago</p>

                <div className="bubble-tag">
                  <span className="material-symbols-outlined tag-icon">folder</span>
                  <p>Project Phoenix</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= SAVED REPORTS ================= */}
        <div className="section">
          <div className="section-header-row">
            <h2 className="section-title">SAVED REPORTS</h2>
            <span className="material-symbols-outlined icon">expand_more</span>
          </div>

          <div className="saved-list">

            <div className="saved-item">
              <div className="left">
                <span className="material-symbols-outlined bookmark">bookmark</span>
                <p>Q4 Earnings Summary</p>
              </div>

              <div className="bubble-tag purple">
                <span className="material-symbols-outlined tag-icon">folder</span>
                <p>Q4 Financials</p>
              </div>
            </div>

            <div className="saved-item">
              <div className="left">
                <span className="material-symbols-outlined bookmark">bookmark</span>
                <p>Competitor Analysis</p>
              </div>

              <div className="bubble-tag blue">
                <span className="material-symbols-outlined tag-icon">folder</span>
                <p>Project Phoenix</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <span className="material-symbols-outlined">settings</span>
        <p>Settings</p>
      </div>
    </aside>
  );
}
