import { useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Sidebar from "../components/Sidebar";
import "../styles/pages/Home.css";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div>
      <div className="header">
        <HomeHeader onMenuClick={handleMenuClick} />
        <h2>
          팝업 스토어
          <br />
          어디로 가볼까요?
        </h2>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Home;
