import { BrowserRouter, Routes, Route } from "react-router-dom";

import DoclingSidebarUI from "./components/Docling Sidebar UI";
import DoclingChatUI from "./components/Docling Chat UI";
import AIInputAreaUI from "./components/AI input area UI";

import ShelvesTable from "./admin/user/components/shelvestable";
import MyShelves from "./admin/user/pages/myshelves";

import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="app-root">
              <div className="app-main">

                {/* SIDEBAR */}
                <DoclingSidebarUI />

                {/* RIGHT PANEL */}
                <div className="chat-column">
                  {/* CHAT BODY */}
                  <DoclingChatUI />

                  {/* INPUT AREA */}
                  <AIInputAreaUI />
                </div>
              </div>

              {/* FLOATING BUTTON */}
              <button className="floating-button">
                <span className="material-symbols-outlined">search</span>
                <span className="material-symbols-outlined">data_object</span>
              </button>
            </div>
          }
        />

        {/* ADMIN */}
        <Route path="/shelves" element={<ShelvesTable />} />
        <Route path="/admin" element={<MyShelves />} />

      </Routes>
    </BrowserRouter>
  );
}
