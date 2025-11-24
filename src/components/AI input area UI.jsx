import "./AI input area UI.css";

export default function AIInputAreaUI() {
  return (
    <div className="right-panel">
      <div className="input-box">

        <textarea
          placeholder="Ask a question about your documents..."
        ></textarea>

        <button className="send-btn">
          <span className="material-symbols-outlined">send</span>
        </button>

      </div>
    </div>
  );
}
