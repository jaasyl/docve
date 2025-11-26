import { BrowserRouter, Routes, Route } from "react-router-dom";

import DoclingSidebarUI from "./components/Docling Sidebar UI";
import DoclingChatUI from "./components/Docling Chat UI";
import AIInputAreaUI from "./components/AI input area UI";

import ShelvesTable from "./admin/user/components/shelvestable";
import MyShelves from "./admin/user/pages/myshelves";
import SuperAdmin from "./admin/superuser/pages/superadmin";

import "./styles.css";
import Nav from "./components/Nav";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="app-wrapper">

              {/* 🔹 NAVBAR AT TOP */}
              <Nav />

              {/* MAIN APP SECTION BELOW NAV */}
              <div className="app-root">
                <div className="app-main">

                  {/* SIDEBAR */}
                  <DoclingSidebarUI />

                  {/* RIGHT PANEL */}
                  <div className="chat-column">
                    <DoclingChatUI />
                    <AIInputAreaUI />
                  </div>

                </div>
              </div>

              {/* FLOATING BUTTON */}
              <button className="floating-button">
                <span className="material-symbols-outlined">mic</span>
              </button>

            </div>
          }
        />

        {/* ADMIN */}
        <Route path="/shelves" element={<ShelvesTable />} />
        <Route path="/admin" element={<MyShelves />} />
        <Route path="/admin-1" element={<SuperAdmin />} />

      </Routes>
    </BrowserRouter>
  );
}

