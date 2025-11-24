import "./Docling Sidebar UI.css";

export default function DoclingSidebarUI() {
  return (
    <aside className="sidebar">

      <div className="section">
        <div className="section-header">
          <span>SHELVES</span>
        </div>

        <div className="switch-tabs">
          <button className="tab active">Personal</button>
          <button className="tab">Shared</button>
        </div>

        <div className="folder active">
          <span className="material-symbols-outlined icon">folder</span>
          <span className="folder-title">Project Phoenix</span>
        </div>

        <div className="file-list">
          <div className="file-item">
            <span className="material-symbols-outlined pdf">picture_as_pdf</span>
            <div className="file-meta">
              <p>Annual-Report-2023.pdf</p>
              <span className="ready-dot"></span> Ready
            </div>
          </div>

          <div className="file-item">
            <span className="material-symbols-outlined doc">description</span>
            <div className="file-meta">
              <p>Meeting_Notes_Q1.docx</p>
              <span className="processing-dot"></span> Processing
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">GLOBAL CHAT HISTORY</div>

        <div className="history-item">
          <p className="title">Summary of Annual Report</p>
          <p className="time">5 hours ago</p>
        </div>

        <div className="history-item">
          <p className="title">Key points from Q1 notes</p>
          <p className="time">2 days ago</p>
        </div>
      </div>

      <div className="sidebar-footer">
        <span className="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </div>

    </aside>
  );
}
