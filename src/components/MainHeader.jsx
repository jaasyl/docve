import "./MainHeader.css";

export default function MainHeader() {
    return (
        <header className="main-header">
            <div className="header-right">
                {/* NOTIFICATION */}
                <button className="header-icon-btn">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="notif-dot"></span>
                </button>

                {/* PROFILE */}
                <div className="header-profile">
                    <div
                        className="profile-avatar"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADwHLSxo_5qRsvc5nGLRElukVa-Qp2jy_n-VZ24BYq6dWfb2T3CFtPdFGBvqOZzHYyPoGKB3kme5mOotumfdjCoP9hHj6BLDd9hRitar5IjyAGp3cZnW821mi9yl1ms0S4L8eaQhprpJ1fsfn-hQopyJ33eJLRykx5K8TZHWZtuvQbeETr6-sjZIJGrUW-PC5Ykuwpf5KLRVRIYuJZL-fiy4jwVT30HXmJ0jzaixenZTxJJJv8txlaQ77pPefRc0H00bS8of3nZ8Ta')"
                        }}
                    ></div>
                    <div className="user-info">
                        <p className="user-name">Alex Mercer</p>
                        <p className="user-email">alex.mercer@example.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
