import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import {
  getDashboardStats,
  getRecentUsers,
  getRecentActivity,
  getHealth,
} from "../../../services/adminDashboardApi";

export default function AdminDashboard() {
  // State management
  const [stats, setStats] = useState([
    { label: "Total Users", value: "...", delta: "Loading..." },
    { label: "Active Users (Today)", value: "...", delta: "Loading..." },
    { label: "Documents Processed", value: "...", delta: "Loading..." },
    { label: "Total Storage Used", value: "...", delta: "Loading..." },
  ]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [health, setHealth] = useState([
    { label: "API Status", state: "Checking..." },
    { label: "Database Connection", state: "Checking..." },
    { label: "Storage Service", state: "Checking..." },
    { label: "Processing Queue", state: "Checking..." },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  /**
   * Fetch all dashboard data
   */
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [statsData, usersData, activityData, healthData] = await Promise.all([
        getDashboardStats(),
        getRecentUsers(4),
        getRecentActivity(),
        getHealth(),
      ]);

      // Update stats
      updateStats(statsData);

      // Update recent users
      updateRecentUsers(usersData);

      // Update activity
      updateActivity(activityData);

      // Update health
      updateHealth(healthData);

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update stats cards with real data
   */
  const updateStats = (data) => {
    setStats([
      {
        label: "Total Users",
        value: formatNumber(data.totalUsers),
        delta: "+5.2% vs last month", // TODO: Calculate from historical data
      },
      {
        label: "Active Users (Today)",
        value: formatNumber(data.activeUsers),
        delta: "+1.8% vs yesterday", // TODO: Calculate from historical data
      },
      {
        label: "Documents Processed",
        value: formatNumber(data.documentsProcessed),
        delta: "+12.4% vs last month", // TODO: Calculate from historical data
      },
      {
        label: "Total Storage Used",
        value: formatStorage(data.storageUsed),
        delta: "+2.1% vs last month", // TODO: Calculate from historical data
      },
    ]);
  };

  /**
   * Update recent users list
   */
  const updateRecentUsers = (users) => {
    const formattedUsers = users.map(user => ({
      name: user.name || user.username || "Unknown User",
      email: user.email || "No email",
      time: formatTimeAgo(user.createdAt),
    }));
    setRecentUsers(formattedUsers);
  };

  /**
   * Update activity table
   */
  const updateActivity = (activityData) => {
    const formattedActivity = activityData.map(log => ({
      admin: log.admin || log.userName || "System",
      action: log.action || log.description || "Activity",
      time: formatDateTime(log.time || log.createdAt),
    }));
    setActivity(formattedActivity.slice(0, 3)); // Show latest 3
  };

  /**
   * Update health status
   */
  const updateHealth = (healthData) => {
    const healthItems = [
      {
        label: "API Status",
        state: healthData?.status === "Healthy" || healthData?.isHealthy ? "Operational" : "Down",
        variant: healthData?.status === "Healthy" || healthData?.isHealthy ? "" : "error",
      },
      {
        label: "Database Connection",
        state: healthData?.database?.status || healthData?.database || "Connected",
        variant: healthData?.database?.status === "Connected" ? "" : "warning",
      },
      {
        label: "Storage Service",
        state: healthData?.storage?.status || "Online",
        variant: "",
      },
      {
        label: "Processing Queue",
        state: healthData?.queue?.status || healthData?.processingQueue || "Operational",
        variant: healthData?.queue?.delayed ? "warning" : "",
      },
    ];
    setHealth(healthItems);
  };

  /**
   * Format number with commas
   */
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "N/A";
    return num.toLocaleString();
  };

  /**
   * Format storage size
   */
  const formatStorage = (storage) => {
    if (!storage || storage === "N/A") return "N/A";
    if (typeof storage === 'string') return storage;

    // If storage is in bytes, convert to GB
    const gb = storage / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  /**
   * Format time ago (e.g., "2 hours ago")
   */
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  /**
   * Format date time (e.g., "2023-10-27 14:30:15")
   */
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(',', '');
  };

  /**
   * Handle add new user button click
   */
  const handleAddUser = () => {
    // TODO: Open modal or navigate to user creation page
    alert("Add New User functionality - to be implemented");
  };

  // Error state
  if (error && !loading) {
    return (
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p style={{ color: '#ef4444' }}>{error}</p>
          </div>
          <button className="primary-btn" onClick={fetchDashboardData}>
            <span className="material-symbols-outlined">refresh</span>
            Retry
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin! Here's an overview of your system.</p>
        </div>
        <button className="primary-btn" onClick={handleAddUser}>
          <span className="material-symbols-outlined">add</span>
          Add New User
        </button>
      </header>

      <section className="stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{loading ? "..." : stat.value}</p>
            <p className="stat-delta">{loading ? "Loading..." : stat.delta}</p>
          </article>
        ))}
      </section>

      <div className="dashboard-search">
        <div className="search-field">
          <span className="material-symbols-outlined">search</span>
          <input placeholder="Search for users, documents..." />
        </div>

        <div className="search-actions">
          <button type="button" className="icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button type="button" className="icon-btn">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button type="button" className="avatar-pill">AM</button>
        </div>
      </div>

      <div className="dashboard-main">
        <section className="growth-card">
          <div className="card-header">
            <div>
              <p className="card-title">User Growth</p>
              <p className="card-subtitle">New users in the last 30 days</p>
            </div>
          </div>

          <div className="chart-placeholder">
            <div className="chart-line" aria-hidden />
          </div>
        </section>

        <aside className="recent-users">
          <div className="card-header">
            <div>
              <p className="card-title">Recently Created Users</p>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
              Loading users...
            </div>
          ) : recentUsers.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
              No recent users found
            </div>
          ) : (
            <ul>
              {recentUsers.map((user, index) => (
                <li key={user.email + index}>
                  <div className="avatar">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <span className="user-time">{user.time}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>

      <div className="dashboard-lower">
        <section className="activity-card">
          <p className="card-title">Recent Admin Activity</p>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
              Loading activity...
            </div>
          ) : activity.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
              No recent activity
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((log, index) => (
                  <tr key={index}>
                    <td>{log.admin}</td>
                    <td>{log.action}</td>
                    <td>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="health-card">
          <p className="card-title">System Health</p>
          <ul>
            {health.map((item) => (
              <li key={item.label}>
                <div>
                  <p className="health-label">{item.label}</p>
                </div>
                <span className={`health-state ${item.variant ? item.variant : ""}`}>
                  {loading ? "..." : item.state}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
