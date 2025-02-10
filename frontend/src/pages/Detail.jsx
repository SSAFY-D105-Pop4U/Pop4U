import { useState, useEffect } from "react";
import "../styles/pages/Detail.css";
import BackButton from "../components/BackButton";
import Info from "../components/Info";
import Review from "../components/Review";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { GetPopupDetail } from "../apis/api/api.js";
import { getReviews } from "../apis/api/api.js";
import eye from "../assets/icons/eye.png";
import ImageCarousel from "../components/ImageCarousel.jsx";


const Detail = () => {
  const nav = useNavigate();

  //✅ 후기 작성페이지로 이동 함수
  const handleWriteReview = () => {
    nav(`/writeReview?popupId=${popupId}`);
  };
  //✅ 예약하기 페이지도 이동 함수수
  const appointment = () => {
    if (!detail) return; // detail이 null이면 함수 실행 X
    nav(`/appointment?popupId=${popupId}&popupName=${encodeURIComponent(detail.popupName)}`);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [detail, setDetail] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [searchParams] = useSearchParams(); // 🔥 URL의 쿼리스트링을 가져옴
  const popupId = searchParams.get("popupId"); // "popupId"의 값만 추출

  const tabList = [
    { id: 0, name: "정보", component: <Info detail={detail} /> },
    {
      id: 1,
      name: `후기(${reviews?.length || 0})`,
      component: <Review reviews={reviews || []} />,
    },
  ];

  // ✅ api 호출 (상세정보)
  const popupdetail = async () => {
    try {
      const data = await GetPopupDetail(popupId);
      setDetail(data);
      console.log("API 응답 (팝업상세):", data);
    } catch (error) {
      console.error("Failed to load popups");
    }
  };

  // ✅ api 호출 (리뷰정보보)
  const ReviewData = async () => {
    try {
      const data = await getReviews(popupId); // API 호출
      setReviews(data);
      console.log("API 응답 (리뷰정보):", data);
    } catch (error) {
      console.error("Failed to load popups");
    }
  };
  useEffect(() => {
    popupdetail();
    ReviewData();
  }, []);

  return (
    <div className="container1">
      <BackButton />

      {/* ✅ 캐러셀 컴포넌트에 detail.popupImages 전달 */}
      {detail?.popupImages?.length > 0 ? (
        <ImageCarousel images={detail.popupImages} />
      ) : (
        <img
          src="https://via.placeholder.com/414x414"
          alt="event"
          className="image"
        />
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

        {/* 슬라이드 바 */}
        <div
          className="tab-slider"
          style={{ left: `${activeIndex * 50}%` }}
        ></div>
      </div>

      {/* ✅ 선택된 탭의 컨텐츠 표시 */}
      <div className="tab-content">{tabList[activeIndex].component}</div>

      {/* 탭 아래 구분선 */}
      {/* <div className="divider1"></div> */}

      {/* ✅ 버튼 영역 */}
      <div className="button-wrapper">
        {activeIndex === 1 ? null : (
          <>
            <button className="button" onClick={appointment}>
              예약하기
            </button>
            <button className="button">채팅하기</button>
          </>
        )}
      </div>
    </div>
  );
};
export default Detail;
