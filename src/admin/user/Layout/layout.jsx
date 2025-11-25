import Nav from "../../../components/Nav";
import DoclingSidebarUI from "../../../components/Docling Sidebar UI";

export default function Layout({ children }) {
  return (
    <div className="app-root">
      <Nav />

      <div className="app-main">
        <DoclingSidebarUI />

        <div className="chat-column">
          {children}
        </div>
      </div>
    </div>
  );
}
