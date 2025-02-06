import { useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Sidebar from "../components/Sidebar";
import "../styles/pages/Home.css";
import HomeArea from "../components/HomeArea";
import HomeHorizScroll from "../components/HomeHorizScroll";

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
        <HomeArea />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="divider1"></div>
      <h3>#새로 생긴 팝업스토어 ✨</h3>
      <HomeHorizScroll />
      <div className="divider2"></div>
      <h3>#마감 임박 팝업스토어 ✨</h3>
      <HomeHorizScroll />
      <div className="divider2"></div>
      <h3>#요즘 뜨는 팝업스토어 ✨</h3>
      <HomeHorizScroll />
    </div>
  );
};

export default Home;
