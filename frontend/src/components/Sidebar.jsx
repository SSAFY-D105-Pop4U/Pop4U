import { useState, useEffect } from "react";
import "../styles/components/Sidebar.css";
import { Link } from "react-router-dom";
import basicProfile from "../assets/images/basicProfile.png";
import phone from "../assets/icons/phone.svg";
import file from "../assets/icons/file-lines-solid.svg";
import officeSolid from "../assets/icons/office-solid.svg";
import calendarPlus from "../assets/icons/calendar-plus-solid.svg";
import penToSquare from "../assets/icons/pen-to-square-solid.svg";
import chartSimple from "../assets/icons/chart-simple-solid.svg";
import calendarDays from "../assets/icons/calendar-days-solid.svg";
import camera from "../assets/icons/camera-solid.svg";
import ticket from "../assets/icons/ticket-solid.svg";
import next from "../assets/icons/next.svg";
import UseAuth from '../hooks/UseAuth.js'

const Sidebar = ({ isOpen, onClose }) => {
  console.log("사이드바",UseAuth());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const userName = "김정모";
  const isLogind = UseAuth();
  console.log(isLogind);
  
  useEffect(() => {
    
    setIsLoggedIn(isLogind); // ✅ 상태 변경은 useEffect에서 처리
  }, [isLogind]);;
  
  
 
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
          </div>
          <div className="profile-info">
            {isLoggedIn ? (
              <Link to="/mypage" className="profile-link">
                <div className="profile-text">
                  <span className="login-text">{userName}</span>님
                  <span>반갑습니다!</span>
                </div>
                <img src={next} alt="next" className="next-icon" />
              </Link>
            ) : (
              <Link to="/login" className="profile-link">
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
                <Link to="/reviewlifeshot">
                  <img src={camera} alt="인생네컷 제작" />
                  인생네컷 제작
                </Link>
              </li>
              {/* <li>
                <Link to="/profile">
                  <img src={penToSquare} alt="내 정보 수정" /> 내 정보 수정
                </Link>
              </li> */}
              <li>
                <Link to="/reservation">
                  <img src={calendarDays} alt="예약 내역 확인" />
                  예약 내역 확인
                </Link>
              </li>
              <li>
                <Link to="/coupons">
                  <img src={ticket} alt="쿠폰함" />
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
                  <img src={calendarPlus} alt="팝업 등록" />
                  팝업 등록
                </Link>
              </li>
              <li>
                <Link to="/admin/manage">
                  <img src={penToSquare} alt="팝업 수정" />
                  팝업 수정
                </Link>
              </li>
              <li>
                <Link to="/admin/sales">
                  <img src={chartSimple} alt="매장 분석" />
                  매장 분석
                </Link>
              </li>
              <li>
                <Link to="/admin/reservations">
                  <img src={calendarDays} alt="입장 예약자 관리" />
                  예약자 관리
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
                <img src={phone} alt="고객센터" />
                고객센터
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <img src={file} alt="이용약관" />
                이용약관
              </Link>
            </li>
            <li>
              <Link to="/company">
                <img src={officeSolid} alt="회사정보" />
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
