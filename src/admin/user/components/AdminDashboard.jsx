import "./adminDashboard.css";

const stats = [
  { label: "Total Users", value: "1,482", delta: "+5.2% vs last month" },
  { label: "Active Users (Today)", value: "216", delta: "+1.8% vs yesterday" },
  { label: "Documents Processed", value: "25,930", delta: "+12.4% vs last month" },
  { label: "Total Storage Used", value: "452 GB", delta: "+2.1% vs last month" },
];

const recentUsers = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", time: "2 hours ago" },
  { name: "Liam Johnson", email: "liam.j@email.com", time: "5 hours ago" },
  { name: "Isabella Garcia", email: "isabella.g@email.com", time: "1 day ago" },
  { name: "Noah Smith", email: "noah.s@email.com", time: "2 days ago" },
];

const activity = [
  {
    admin: "Admin User",
    action: "Created new user: olivia.martin@email.com",
    time: "2023-10-27 14:30:15",
  },
  {
    admin: "Admin User",
    action: "Updated system settings: Storage limit",
    time: "2023-10-27 11:05:42",
  },
  {
    admin: "Admin User",
    action: "Deleted document: ID 8f7e2c9a",
    time: "2023-10-26 09:12:03",
  },
];

const health = [
  { label: "API Status", state: "Operational" },
  { label: "Database Connection", state: "Connected" },
  { label: "Storage Service", state: "Online" },
  { label: "Processing Queue", state: "Delayed (5 items)", variant: "warning" },
];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin! Here's an overview of your system.</p>
        </div>
        <button className="primary-btn">
          <span className="material-symbols-outlined">add</span>
          Add New User
        </button>
      </header>

      <section className="stat-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-delta">{stat.delta}</p>
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

          <ul>
            {recentUsers.map((user) => (
              <li key={user.email}>
                <div className="avatar">{user.name.slice(0, 2)}</div>
                <div>
                  <p className="user-name">{user.name}</p>
                  <p className="user-email">{user.email}</p>
                </div>
                <span className="user-time">{user.time}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="dashboard-lower">
        <section className="activity-card">
          <p className="card-title">Recent Admin Activity</p>
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
                  {item.state}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}


