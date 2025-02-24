import { useState, useEffect, useContext } from "react";
import "../styles/pages/Detail.css";
import Header from "../components/basic/Header";
import Info from "../components/Info";
import Review from "../components/Review";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetPopupDetail, getReviews } from "../apis/api/api.js";
import eye from "../assets/icons/eye.png";
import ImageCarousel from "../components/ImageCarousel.jsx";
import { AppDataContext } from "../Context.jsx"; 
import UseAuth from '../hooks/UseAuth.js'
import ModalIsLogin from "../components/ModalIsLogin.jsx";
import { color } from "chart.js/helpers";
import BackToHomeButton from "../components/BackTohomeButton.jsx";


const Detail = () => {
  const nav = useNavigate();
  const { appData, setAppData } = useContext(AppDataContext); // ✅ useContext 사용
  const [activeIndex, setActiveIndex] = useState(0);
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId"); // "popupId"의 값만 추출

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그인 확인
  const isLoggedIn = UseAuth();
  // console.log(isLoggedIn);
  

  //✅ 후기 작성페이지로 이동 함수
  const handleWriteReview = () => {
    nav(`/writeReview?popupId=${popupId}`);
  };

  const handleLogin = () => {
    nav(`/login`);
  };

  const handlechat = () => {
    if(!isLoggedIn){
      setIsModalOpen(true)
      return;
    }
    
    nav(`/chat?popupId=${popupId}&popName=${encodeURIComponent(detail.popupName)}`);
  };
  
 
  //✅ 예약하기 페이지 이동 함수
  const appointment = () => {
    if (!detail) return;
    if(!isLoggedIn){
      setIsModalOpen(true)
      return;
    }
    nav(
      `/appointment?popupId=${popupId}&popupName=${encodeURIComponent(
        detail.popupName
      )}&startDate=${encodeURIComponent(
        detail.popupStartDate
      )}&endDate=${encodeURIComponent(
        detail.popupEndDate
      )}&popupTime=${encodeURIComponent(
        detail.popupOperationTime
      )}&peopleCount=${encodeURIComponent(
        detail.popupMaximumPeople
      )}`
    );
  };

  // ✅ 탭바 이동리스트
  const tabList = [
    { id: 0, name: "정보", component: <Info detail={detail} /> },
    {
      id: 1,
      name: `리뷰(${reviews?.length || 0})`,
      component: <Review reviews={reviews || []} />,
    },
  ];

  // ✅ API 호출 (상세정보 가져오기)
  const popupdetail = async () => {
    try {
      const data = await GetPopupDetail(popupId);
      setDetail(data);
      // console.log("📌 API 응답 (팝업상세):", data);

      // ✅ useContext에 popup 정보 저장
      setAppData((prev) => ({
        ...prev,
        popupId: popupId,
        popupName: data.popupName,
      }));
    } catch (error) {
      console.error("❌ Failed to load popups", error);
    }
  };

  // ✅ API 호출 (리뷰정보 가져오기)
  const ReviewData = async () => {
    try {
      const data = await getReviews(popupId);
      setReviews(data);
      // console.log("📌 API 응답 (리뷰정보):", data);
    } catch (error) {
      console.error("❌ Failed to load reviews", error);
    }
  };

  useEffect(() => {
    popupdetail();
    ReviewData();
    // console.log("Context 데이터 현황:", appData);
  }, []); // ✅ popupId 변경될 때마다 API 호출

  return (
    <div className="container1">
      
      <header id="header" >
      <div className="inner__new">
            <BackToHomeButton/>
      </div>
      </header>
      
      
      <div className="detail-header">
      <header id="header" className="wbg">
      <div className="inner__new">
        <h1>
          <a href="/" className="h__logo">
            <span>Pop4U</span>
          </a>
        </h1>
      </div>
      </header>

      </div>
      <div className="left-section">
        {/* 이미지 섹션 */}
        {detail?.popupImages?.length > 0 ? (
          <div className="image-container">
            <ImageCarousel images={detail.popupImages} />
          </div>
        ) : (
          <div className="image-container">
            <img
              src="https://via.placeholder.com/414x414"
              alt="event"
              className="image"
            />
          </div>
        )}
      </div>
      
      

      <div className="detail-right-section">
        {/* view와 name을 right-section 안으로 이동 */}
        

        <div className="name">{(detail||[]).popupName}</div>

        <div className="view">
          <img src={eye} alt="eye" className="eye" />
          <div>{detail?.popupViewCount ?? 0}</div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="tab-container">
          {tabList.map((tab, index) => (
            <div
              key={index}
              className={`tab ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {tab.name}
            </div>
          ))}
          <div
            className="tab-slider"
            style={{ left: `${activeIndex * 50}%` }}
          ></div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="tab-content">
          {tabList[activeIndex].component}
        </div>

        <div className="desktop-detail-button" style={{  justifyContent: "space-between", gap: "10px", width: "100%" }}>
          {activeIndex === 1 ? null : (
          <>
      <button 
        style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }} 
        className="apointment-button" 
        onClick={appointment}
      >
        예약하기
      </button>
      <button 
        style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }} 
        className="detail-chat-button" 
        onClick={handlechat}
      >
        채팅하기
      </button>
    </>
  )}
</div>


      </div>
      {/* 버튼 영역 */}
      <div className="mobile-detail-button">

        <div style={{display: "flex"}}>
        {activeIndex === 1 ? null : (
          <>
            <button style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", margin:"10px" }}  className="apointment-button" onClick={appointment}>
              예약하기
            </button>
            <button style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center",margin:"10px" }}  className="detail-chat-button" onClick={handlechat}>
              채팅하기
            </button>
          </>
        )}
        </div>
        
      </div>

      {isModalOpen  &&(<div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{fontWeight:"bold", fontSize:"20px"}}>로그인이 필요해요.</h2>

            {/* ✅ URL을 복사할 수 있도록 버튼 추가 */}
            <br />
              회원이 아니라면 가입후,<br/>
              Pop4U 서비스를 이용할 수 있습니다.
           
            <br />
            <button onClick={handleLogin} style={styles.copyButton}>
              로그인 
            </button>
            <button onClick={() => setIsModalOpen(false)} style={styles.modalCloseBtn}>
              닫기
            </button>
          </div>
        </div>)}

      

      
    </div>
  );
};


const styles = {
  container: {
    width: "350px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  /* ✅ 직접 입력하는 시간 입력창 스타일 */
  timeInput: {
    fontSize: "18px",
    padding: "8px",
    margin: "10px 0",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "150px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  /* ✅ 모달 스타일 */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    padding: "20px",
    width: "350px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },


  copyContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  copyInput: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    textAlign: "center",
  },
  copyButton: {
    padding: "10px 20px",
    backgroundColor: "#002C5F",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    borderRadius: "5px",
    margin: "10px",
  },
  modalCloseBtn: {
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    color: "#002C5F", 
    border: "2px solid #002C5F",
    cursor: "pointer",
    marginTop: "10px",
    borderRadius: "5px",
  },

  
};




export default Detail;
