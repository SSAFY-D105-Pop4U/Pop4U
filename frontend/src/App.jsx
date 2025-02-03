import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="app">
      <button className="menu-button" onClick={openSidebar}>
        메뉴 열기
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </div>
  );
}

export default App;
