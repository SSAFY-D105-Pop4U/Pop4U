import { useState } from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={handleClose}></div>
      <div className={`sidebar ${isClosing ? "closing" : ""}`}>
        <div className="menu-header">
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
          <h2>메뉴</h2>
        </div>

        <div className="profile-section">
          <div className="profile-icon">
            <img src="/profile-placeholder.png" alt="프로필" />
          </div>
          <div className="profile-info">
            <span>P4U에</span>
            <span className="login-text">로그인</span>
            <span>해주세요</span>
            <span className="arrow">›</span>
          </div>
        </div>

        <div className="menu-section">
          <h3>고객지원</h3>
          <ul>
            <li>
              <img src="/icon-center.png" alt="" />
              고객센터
            </li>
            <li>
              <img src="/icon-transfer.png" alt="" />
              이용약관
            </li>
            <li>
              <img src="/icon-info.png" alt="" />
              회사정보
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
