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

      <div className="messages">

        {/* BOT MESSAGE */}
        <div className="msg-bot">
          <div className="bot-icon">
            <span className="material-symbols-outlined">data_object</span>
          </div>

          <div className="bubble bot">
            <p className="title">Summary of Annual Report 2023</p>
            <p>
              The annual report for 2023 highlights a 15% year-over-year revenue growth…
            </p>

            <div className="actions">
              <span className="material-symbols-outlined">thumb_up</span>
              <span className="material-symbols-outlined">thumb_down</span>
              <span className="material-symbols-outlined">share</span>
              <span className="material-symbols-outlined">file_download</span>
              <span className="material-symbols-outlined">bookmark</span>
            </div>
          </div>
        </div>

        {/* USER MESSAGE */}
        <div className="msg-user">
          <div className="bubble user">
            Can you explain the main contributors to the revenue growth in more detail?
          </div>
        </div>
      </div>
    </div>
  );
}
