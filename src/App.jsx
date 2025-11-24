import { BrowserRouter, Routes, Route } from "react-router-dom";

import DoclingSidebarUI from "./components/Docling Sidebar UI";
import DoclingChatUI from "./components/Docling Chat UI";
import AIInputAreaUI from "./components/AI input area UI";
import ThemeToggle from "./components/ThemeToggle";

import MyShelves from "./admin/user/pages/myshelves";

import "./styles.css";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Your existing UI */}
        <Route
          path="/"
          element={
            <div className="app-root">
              <header className="app-header">
                <div className="left">
                  <span className="material-symbols-outlined logo">
                    data_object
                  </span>
                  <h1>Docling</h1>
                </div>
                <ThemeToggle />
              </header>

              <div className="app-main">
                <DoclingSidebarUI />
                <DoclingChatUI />
              </div>

              <AIInputAreaUI />
            </div>
          }
        />

        {/* NEW ADMIN PAGE */}
        <Route path="/admin/shelves" element={<MyShelves />} />
      </Routes>
    </BrowserRouter>
  );
}
