import React, { useState } from "react";
import Calendar from "../components/appointment/Calendar";
import PersonSelector from "../components/appointment/PersonSelector";
import ProgressBar from "../components/appointment/ProgressBar";
import Header from "../components/public/Header";
import Time from "../components/appointment/Time";
import NextButton from "../components/NextButton";
import Recheck from "../components/appointment/recheck";
import { useSearchParams } from "react-router-dom";
import {postappointment} from "../apis/api/api.js"


const Appointment = () => {
  const [resultDate, setResultDate] = useState(""); //날짜 
  const [selectedPerson, setSelectedPerson] = useState(0); // 선택된 인원 수
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(true);

  // 버튼 활성화 조건
  const isDisabled = !resultDate || selectedPerson === 0 || !selectedTime;
  const [searchParams] = useSearchParams(); // 🔥 URL의 쿼리스트링을 가져옴
  const popupName = searchParams.get("popupName"); // "popupId"의 값만 추출
  const popupId = searchParams.get("popupId"); // "popupId"의 값만 추출
  

    const appointment = async () => {
      try {
        const data = await postappointment(popupId);
        setDetail(data);
        console.log("API 응답 (팝업상세):", data);
      } catch (error) {
        console.error("Failed to load popups");
      }
    };
  

  const handleNextButtonClick = () => {
    // Next 버튼 클릭 시 컴포넌트를 숨김김

    setShowAppointmentDetails(false);
    console.log(showAppointmentDetails);
    console.log(resultDate);
    console.log(selectedPerson);
    console.log(selectedTime);
  };
  return (
    <div>
      <Header title="방문 예약" />
      <ProgressBar showAppointmentDetails={showAppointmentDetails} />
      {showAppointmentDetails ? (
        <>
          <Calendar resultDate={resultDate} setResultDate={setResultDate} />
          <PersonSelector
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
          <Time selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </>
      ) : (
        <>
          <h3>
            예약 정보를 다시 한 번<br />
            확인해주세요.
          </h3>
          <Recheck
            name={popupName}
            date={resultDate}
            people={selectedPerson}
            title={selectedTime}
          />
        </>
      )}
    <button onClick={appointment}>확인</button>
      {/* <NextButton isDisabled={isDisabled} onClick={handleNextButtonClick;appointme nt}>
        확인
      </NextButton> */}
    </div>
  );
};

export default Appointment;
