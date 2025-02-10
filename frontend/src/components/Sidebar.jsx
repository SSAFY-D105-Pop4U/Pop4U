import { useState } from "react";
import "../styles/components/Sidebar.css";
import { Link } from "react-router-dom";
import basicProfile from "../assets/images/basicProfile.png";
import center from "../assets/images/center.png";
import next from "../assets/icons/next.svg";

const Sidebar = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const userName = "김정모";

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <>
      <div className="sidebar-overlay" onClick={handleClose}></div>
      <div className={`sidebar ${isClosing ? "closing" : ""}`}>
        <div className="menu-header">
          <h2>메뉴</h2>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="profile-section">
          <div className="profile-icon">
            <img src={basicProfile} alt="프로필" />
          </div>
          <div className="profile-info">
            {isLoggedIn ? (
              <Link to="/mypage" className="profile-link">
                <div className="profile-text">
                  <span>{userName}님</span>
                  <span>반갑습니다!</span>
                </div>
                <img src={next} alt="next" className="next-icon" />
              </Link>
            ) : (
              <Link to="/" className="profile-link">
                <div className="profile-text">
                  <span>P4U에</span>
                  <span className="login-text">로그인</span>
                  <span>해주세요</span>
                </div>
                <img src={next} alt="next" className="next-icon" />
              </Link>
            )}
          </div>
        </div>

        {isLoggedIn && !isAdmin && (
          <div className="menu-section">
            <h3>개인 페이지</h3>
            <ul>
              <li>
                <Link to="/create">
                  <img src={center} alt="인생네컷 제작" />
                  인생네컷 제작
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <img src={center} alt="내 정보 수정" /> 내 정보 수정
                </Link>
              </li>
              <li>
                <Link to="/reservations">
                  <img src={center} alt="예약 내역 확인" />
                  예약 내역 확인
                </Link>
              </li>
              <li>
                <Link to="/coupons">
                  <img src={center} alt="쿠폰함" />
                  쿠폰함
                </Link>
              </li>
            </ul>
          </div>
        )}

        {isLoggedIn && isAdmin && (
          <div className="menu-section">
            <h3>관리자 페이지</h3>
            <ul>
              <li>
                <Link to="/admin/stores">
                  <img src={center} alt="팝업 등록" />
                  팝업 등록
                </Link>
              </li>
              <li>
                <Link to="/admin/manage">
                  <img src={center} alt="팝업 수정" />
                  팝업 수정
                </Link>
              </li>
              <li>
                <Link to="/admin/sales">
                  <img src={center} alt="매장 분석" />
                  매장 분석
                </Link>
              </li>
              <li>
                <Link to="/admin/reservations">
                  <img src={center} alt="입장 예약자 관리" />
                  입장 예약자 관리
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="menu-section">
          <h3>고객지원</h3>
          <ul>
            <li>
              <Link to="/support">
                <img src={center} alt="고객센터" />
                고객센터
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <img src={center} alt="이용약관" />
                이용약관
              </Link>
            </li>
            <li>
              <Link to="/company">
                <img src={center} alt="회사정보" />
                회사정보
              </Link>
            </li>
          </ul>
        </div>

        {isLoggedIn && (
          <div className="logout-section">
            <button className="logout-button">로그아웃</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
