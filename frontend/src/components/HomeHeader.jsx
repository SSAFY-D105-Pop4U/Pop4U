import logo from "../assets/icons/logo.png";
import search from "../assets/icons/search.png";
import notice from "../assets/icons/notice.png";
import menu from "../assets/icons/menu.png";

const HomeHeader = ({ onMenuClick }) => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="로고 이미지" width="64" height="64" />

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <img src={search} alt="검색 아이콘" width="17" height="17" />
          <img src={notice} alt="알림 아이콘" width="17" height="17" />
          <img
            src={menu}
            alt="메뉴 아이콘"
            width="20"
            height="17"
            onClick={onMenuClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
