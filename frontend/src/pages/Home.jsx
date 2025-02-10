import { useEffect, useState } from "react";
import HomeHeader from "../components/homePage/HomeHeader";
import Sidebar from "../components/Sidebar";
import "../styles/pages/Home.css";
import HomeArea from "../components/homePage/HomeArea";
import HomeHorizScroll from "../components/homePage/HomeHorizScroll";
import Divider from "../components/public/Divider";
import {getPopups} from "../apis/api/api.js";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const [popups, setPopups] = useState({});

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const data = await getPopups();
        setPopups(data);
        console.log("팝업 리스트트 조회완료")
        
      } catch (error) {
        console.error("Failed to load popups");
        
      }
    };

    fetchPopups();
  }, []);

  return (
    <div>
      <div className="home-header">
        <HomeHeader onMenuClick={handleMenuClick} />
      </div>
      <div className="home-title">
        <h2>
          팝업 스토어
          <br />
          어디로 가볼까요?
        </h2>
      </div>

      <div className="home-area">
        <HomeArea />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Divider height="10px" top="10px" bottom="10px" />
      <h3>#새로 생긴 팝업스토어 ✨</h3>
      <HomeHorizScroll popups={popups.byStartDate || []} />
      <Divider height="5px" top="5px" bottom="5px" />
      <h3>#마감 임박 팝업스토어 ✨</h3>
      <HomeHorizScroll popups={popups.byEndDate || []} />
      <Divider height="5px" top="5px" bottom="5px" />
      <h3>#요즘 뜨는 팝업스토어 ✨</h3>
      <HomeHorizScroll popups={popups.byViewCount || []} />
    </div>
  );
};

export default Home;
