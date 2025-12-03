import { BrowserRouter, Routes, Route } from "react-router-dom";

import DoclingSidebarUI from "./components/Docling Sidebar UI";
import DoclingChatUI from "./components/Docling Chat UI";
import AIInputAreaUI from "./components/AI input area UI";

import ShelvesTable from "./admin/user/components/shelvestable";
import MyShelves from "./admin/user/pages/myshelves";
import SuperAdmin from "./admin/superuser/pages/superadmin";

import ApiDemo from "./components/ApiDemo";  // ✅ Confirmed correct path

import "./styles.css";
import MainHeader from "./components/MainHeader";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="app-wrapper">

              {/* MAIN APP SECTION */}
              <div className="app-root">

                {/* SIDEBAR */}
                <DoclingSidebarUI />

                {/* RIGHT PANEL */}
                <div className="main-column">
                  <MainHeader />

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

        {/* API TEST PAGE */}
        <Route path="/api-demo" element={<ApiDemo />} />
   
      </Routes>
    </BrowserRouter>
  );
}
