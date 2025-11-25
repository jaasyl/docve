import "./Nav.css";

export default function Nav() {
  return (
    <header className="nav-header">

      {/* LEFT — LOGO */}
      <div className="nav-left">
       
        <h1 className="nav-title">Docve</h1>
      </div>

      {/* RIGHT — NOTIFICATION + PROFILE */}
      <div className="nav-right">

        {/* NOTIFICATION (NO CIRCLE BG) */}
        <button className="nav-bell-btn">
          <span className="material-symbols-outlined">notifications</span>
          <span className="notif-dot"></span>
        </button>

        {/* PROFILE */}
        <div className="nav-profile-area">
          <div className="profile-trigger">

            <div
              className="profile-avatar"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADwHLSxo_5qRsvc5nGLRElukVa-Qp2jy_n-VZ24BYq6dWfb2T3CFtPdFGBvqOZzHYyPoGKB3kme5mOotumfdjCoP9hHj6BLDd9hRitar5IjyAGp3cZnW821mi9yl1ms0S4L8eaQhprpJ1fsfn-hQopyJ33eJLRykx5K8TZHWZtuvQbeETr6-sjZIJGrUW-PC5Ykuwpf5KLRVRIYuJZL-fiy4jwVT30HXmJ0jzaixenZTxJJJv8txlaQ77pPefRc0H00bS8of3nZ8Ta')"
              }}
            ></div>

            {/* USER INFO (VISIBLE) */}
            <div className="nav-user-info">
              <p className="nav-user-name">Alex Mercer</p>
              <p className="nav-user-email">alex.mercer@example.com</p>
            </div>

          </div>

          {/* DROPDOWN */}
          <div className="nav-dropdown">
            <a className="dropdown-item">
              <span className="material-symbols-outlined">contrast</span>
              Change Theme
            </a>
            <a className="dropdown-item logout">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
