import { useState } from "react";
import { FiUsers, FiFileText, FiDatabase, FiActivity } from "react-icons/fi";
import "./superadmin-dashboard.css";

export default function SuperAdminDashboard() {
  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome back, Admin! Here's an overview of your system.</p>
        <button className="add-user-btn">+ Add New User</button>
      </div>

      {/* TOP STATS ROW */}
      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Users</h4>
          <h2>1,482</h2>
          <span className="positive">+5.2% vs last month</span>
        </div>

        <div className="stat-card">
          <h4>Active Users (Today)</h4>
          <h2>216</h2>
          <span className="positive">+1.8% vs yesterday</span>
        </div>

        <div className="stat-card">
          <h4>Documents Processed</h4>
          <h2>25,930</h2>
          <span className="positive">+12.4% vs last month</span>
        </div>

        <div className="stat-card">
          <h4>Total Storage Used</h4>
          <h2>452 GB</h2>
          <span className="positive">+2.1% vs last month</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input type="text" placeholder="Search for users, documents..." />
      </div>

      {/* MID GRID */}
      <div className="mid-grid">
        {/* USER GROWTH */}
        <div className="chart-card">
          <h3>User Growth</h3>
          <p>New users in the last 30 days</p>
          <div className="chart-placeholder">Chart Placeholder</div>
        </div>

        {/* RECENT CREATED USERS */}
        <div className="right-card">
          <h3>Recently Created Users</h3>
          <ul>
            <li>
              <strong>Olivia Martin</strong>
              <span>olivia.martin@email.com</span>
              <span className="time">2 hours ago</span>
            </li>
            <li>
              <strong>Liam Johnson</strong>
              <span>liam.j@email.com</span>
              <span className="time">5 hours ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="bottom-grid">
        {/* RECENT ACTIVITY */}
        <div className="activity-card">
          <h3>Recent Admin Activity</h3>
          <table>
            <thead>
              <tr>
                <th>Admin</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin User</td>
                <td>Created new user</td>
                <td>2023-10-27</td>
              </tr>
              <tr>
                <td>Admin User</td>
                <td>Updated settings</td>
                <td>2023-10-27</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="health-card">
          <h3>System Health</h3>
          <ul>
            <li><strong>API Status:</strong> <span className="ok">Operational</span></li>
            <li><strong>Database:</strong> <span className="ok">Connected</span></li>
            <li><strong>Storage:</strong> <span className="ok">Online</span></li>
            <li><strong>Queue:</strong> <span className="warning">Delayed (5 items)</span></li>
          </ul>
        </div>
      </div>

    </div>
  );
}
