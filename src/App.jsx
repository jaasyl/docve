import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DoclingSidebarUI from "./components/Docling Sidebar UI";
import DoclingChatUI from "./components/Docling Chat UI";
import AIInputAreaUI from "./components/AI input area UI";

import ShelvesTable from "./admin/user/components/shelvestable";
import MyShelves from "./admin/user/pages/myshelves";
import SuperAdmin from "./admin/superuser/pages/superadmin";

import ApiDemo from "./components/ApiDemo";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import "./styles.css";
import MainHeader from "./components/MainHeader";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE - Login (accessible to everyone) */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTE - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ROUTE - Home (Original Chat UI) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ROUTE - Home (redirect to dashboard) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/shelves"
          element={
            <ProtectedRoute>
              <ShelvesTable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MyShelves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-1"
          element={
            <ProtectedRoute>
              <SuperAdmin />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED API TEST PAGE */}
        <Route
          path="/api-demo"
          element={
            <ProtectedRoute>
              <ApiDemo />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login if not authenticated, dashboard if authenticated */}
        <Route
          path="*"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
