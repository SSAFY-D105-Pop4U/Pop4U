import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainVisSection = () => {
  const [isVisible, setIsVisible] = useState("");
  const [isImage, setIsImage] = useState("");

  const nav = useNavigate();

  const handleSendText = (type) => {
    nav(`/areaList?area=${type}`);
  };

  useEffect(() => {
    // 페이지 로드 후 애니메이션 트리거
    setTimeout(() => {
      setIsVisible("ready");
      setIsImage("https://cdn.hankyung.com/photo/202309/01.34543982.1.jpg")
    }, 300); // 0.1초 후 애니메이션 실행
  }, []);

  return (
    <div className={`main__vis section ${isVisible ? "animate" : ""}`}>
      <div className="main__cont__wrap">
        <div className="inner__new">
          <strong id="mainSlog">Popup Store for You</strong>
          <p id="subSlog">당신을 위한 팝업스토어</p>
          <ul className="tag__list addTagList">
            <li className="em">
              <a href="/apply/applyList.hc?intnsvYn=Y">어디로 가볼까요?</a>
            </li>
            <br className="mobile" />
            <li>
              <a onClick={()=>handleSendText("서울")}>#서울</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("경기/인천")}>#경기/인천</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("강원도")}>#강원도</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("경남/부산")}>#경남/부산</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("경북/대구")}>#경북/대구</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("충청/대전")}>#충청/대전</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("전라/광주")}>#전라/광주</a>
            </li>
            <li>
              <a onClick={()=>handleSendText("제주도")}>#제주도</a>
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

      <button className="top__down__btn">아래로</button>
    </div>
  );
};

export default MainVisSection;
