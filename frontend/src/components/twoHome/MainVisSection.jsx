import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MainVisSection = () => {
  const [isVisible, setIsVisible] = useState("");
  const [isImage, setIsImage] = useState("");
  const nav = useNavigate();
  const sectionRef = useRef(null);

  const handleSendText = (type) => {
    nav(`/areaList?area=${type}`);
  };

  useEffect(() => {
    const imageUrl = "https://cdn.hankyung.com/photo/202309/01.34543982.1.jpg";
    // 이미지 프리로딩
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsImage(imageUrl);
      // 이미지 로드 후 약간의 딜레이 후 애니메이션 트리거
      setTimeout(() => {
        setIsVisible("ready");
      }, 300);
    };
  }, []);

  const handleDownBtn = () => {
    if (sectionRef.current) {
      // 상단바로 사용할 요소 선택 (예: id="header")
      const headerEl = document.getElementById("header");
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      
      const sectionBottom =
        sectionRef.current.offsetTop + sectionRef.current.offsetHeight - headerHeight;

      window.scrollTo({
        top: sectionBottom,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`main__vis section ${isVisible ? "animate" : ""}`}
    >
      <div className="main__cont__wrap">
        <div className="inner__new">
          <strong id="mainSlog">Popup Store for You</strong>
          <p id="subSlog">당신을 위한 팝업스토어</p>
          <ul className="tag__list addTagList">
            <li className="em">
              {/* 기본 링크 동작 방지 */}
              <a href="#" onClick={(e) => e.preventDefault()}>
                어디로 가볼까요?
              </a>
            </li>
            <br className="mobile" />
            <li>
              <a onClick={() => handleSendText("서울")}>#서울</a>
            </li>
            <li>
              <a onClick={() => handleSendText("경기/인천")}>#경기/인천</a>
            </li>
            <li>
              <a onClick={() => handleSendText("강원도")}>#강원도</a>
            </li>
            <li>
              <a onClick={() => handleSendText("경남/부산")}>#경남/부산</a>
            </li>
            <li>
              <a onClick={() => handleSendText("경북/대구")}>#경북/대구</a>
            </li>
            <li>
              <a onClick={() => handleSendText("충청/대전")}>#충청/대전</a>
            </li>
            <li>
              <a onClick={() => handleSendText("전라/광주")}>#전라/광주</a>
            </li>
            <li>
              <a onClick={() => handleSendText("제주도")}>#제주도</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main__bg">
        <img
          className={isVisible}
          id="mainImg"
          src={isImage}
          alt="Popup Store"
        />
      </div>
      <button className="top__down__btn" onClick={handleDownBtn}>
        아래로
      </button>
    </div>
  );
};

export default MainVisSection;
