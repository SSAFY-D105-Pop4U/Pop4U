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



const Detail = () => {
  const nav = useNavigate();
  const { appData, setAppData } = useContext(AppDataContext); // ✅ useContext 사용
  const [activeIndex, setActiveIndex] = useState(0);
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId"); // "popupId"의 값만 추출

  //✅ 후기 작성페이지로 이동 함수
  const handleWriteReview = () => {
    nav(`/writeReview?popupId=${popupId}`);
  };

  //✅ 예약하기 페이지 이동 함수
  const appointment = () => {
    if (!detail) return;
    nav(
      `/appointment?popupId=${popupId}&popupName=${encodeURIComponent(
        detail.popupName
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
      console.log("📌 API 응답 (팝업상세):", data);

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
      console.log("📌 API 응답 (리뷰정보):", data);
    } catch (error) {
      console.error("❌ Failed to load reviews", error);
    }
  };

  useEffect(() => {
    popupdetail();
    ReviewData();
    console.log("Context 데이터 현황:", appData);
  }, []); // ✅ popupId 변경될 때마다 API 호출

  return (
    <div className="container1">
      <Header title="팝업 상세" />

      {/* ✅ 캐러셀 컴포넌트에 detail.popupImages 전달 */}
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

      {/* ✅ 선택된 탭의 컨텐츠 표시 */}
      <div className="tab-content">{tabList[activeIndex].component}</div>

      {/* ✅ 버튼 영역 */}
      <div className="button-wrapper">
        {activeIndex === 1 ? null : (
          <>
            <button className="apointment-button" onClick={appointment}>
              예약하기
            </button>
            <button className="chat-button">채팅하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
