import logo from "../../assets/icons/smallLogo.png";
import search from "../../assets/icons/search.png";
import notice from "../../assets/icons/notice.png";
import menu from "../../assets/icons/menu.png";
import { useNavigate } from "react-router-dom";

const HomeHeader = ({ onMenuClick }) => {
  const nav = useNavigate();

  const moveSearch = () => {
    nav(`/search`);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="로고 이미지" width="64" height="64" />

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: "18px",
            alignItems: "center",
          }}
        >
          <img
            src={search}
            alt="검색 아이콘"
            width="20"
            height="20"
            onClick={moveSearch}
          />
          <img src={notice} alt="알림 아이콘" width="20" height="20" />
          <img
            src={menu}
            alt="메뉴 아이콘"
            width="20"
            height="20"
            onClick={onMenuClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
