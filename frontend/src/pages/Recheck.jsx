import React from "react";
import "../styles/pages/Recheck.css";
import Header from "../components/basic/Header";
import ProgressBar from "../components/appointment/ProgressBar";
import NextButton from "../components/NextButton";
import { useNavigate } from "react-router-dom";

const Recheck = ({ name, title, people, date }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="방문 예약" />
      <ProgressBar showAppointmentDetails={false} />

      <h3>
        예약 정보를 다시 한 번<br />
        확인해주세요.
      </h3>

      <div className="recheck-container">
        <div className="recheck-item">
          <span className="recheck-label">팝업명</span>
          <span className="recheck-value">{name}</span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">인원</span>
          <span className="recheck-value">{people}명</span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">날짜</span>
          <span className="recheck-value">{date}</span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">시간</span>
          <span className="recheck-value">{title}</span>
        </div>
      </div>

      <NextButton onClick={() => navigate("/reservation")}>확정</NextButton>
    </div>
  );
};

export default Recheck;
