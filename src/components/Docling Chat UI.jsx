import "./Docling Chat UI.css";

export default function DoclingChatUI() {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <p>
          <span className="sub">Chatting with:</span>
          Project Phoenix / Annual-Report-2023.pdf
        </p>
      </div>

      <div className="chat-thread">
        {/* BOT CARD */}
        <div className="bot-card">
          <div className="bot-card-header">
            <div className="bot-icon">
              <span className="material-symbols-outlined">data_object</span>
            </div>
            <div>
              <p className="meta-title">Summary of Annual Report 2023</p>
              <p className="meta-sub">Generated 1 min ago</p>
            </div>
          </div>

          <div className="bot-card-body">
            <p>
              The annual report for 2023 highlights a 15% year-over-year revenue growth,
              primarily driven by the successful launch of Project Phoenix. Key financial
              metrics include a net profit margin of 12% and an earnings per share (EPS)
              of $2.50. Would you like me to elaborate on a specific section?
            </p>
          </div>

          <div className="card-actions">
            <button type="button">
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">thumb_down</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">file_download</span>
            </button>
            <button type="button">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </div>

        {/* USER MESSAGE */}
        <div className="user-row">
          <div className="user-bubble">
            Can you explain the main contributors to the revenue growth in more detail?
          </div>
          <div
            className="chat-avatar"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADwHLSxo_5qRsvc5nGLRElukVa-Qp2jy_n-VZ24BYq6dWfb2T3CFtPdFGBvqOZzHYyPoGKB3kme5mOotumfdjCoP9hHj6BLDd9hRitar5IjyAGp3cZnW821mi9yl1ms0S4L8eaQhprpJ1fsfn-hQopyJ33eJLRykx5K8TZHWZtuvQbeETr6-sjZIJGrUW-PC5Ykuwpf5KLRVRIYuJZL-fiy4jwVT30HXmJ0jzaixenZTxJJJv8txlaQ77pPefRc0H00bS8of3nZ8Ta')"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
