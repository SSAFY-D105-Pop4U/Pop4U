import React, { useState } from "react";
import Calendar from "../components/appointment/Calendar"
import PersonSelector from "../components/appointment/PersonSelector"
import ProgressBar from "../components/appointment/ProgressBar"
import Header from "../components/public/Header"
import Time from "../components/appointment/Time"
import NextButton from "../components/NextButton"
import Recheck from "../components/appointment/recheck";

const Appointment = () => {

   

    const [resultDate, setResultDate] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(0); // 선택된 인원 수
    const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간
    const [showAppointmentDetails, setShowAppointmentDetails] = useState(true); 

    
    
     // 버튼 활성화 조건
  const isDisabled = !resultDate || selectedPerson === 0 || !selectedTime;

  const handleNextButtonClick = () => {
    // Next 버튼 클릭 시 컴포넌트를 숨김
    console.log("Next 버튼 클릭");
    
    setShowAppointmentDetails(false);
    console.log(showAppointmentDetails);
    console.log(resultDate);
    console.log(selectedPerson);
    console.log(selectedTime);
  };
    return (
        <div>
            <Header title="방문 예약"/>
            <ProgressBar showAppointmentDetails={showAppointmentDetails}/>
            {showAppointmentDetails ? (
        <>
          <Calendar resultDate={resultDate} setResultDate={setResultDate} />
          <PersonSelector
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
          <Time selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
        </>
      ):(<>
            <h3>예약 정보를 다시 한 번<br/>확인해주세요.</h3>
            <Recheck date={resultDate} people={selectedPerson} title={selectedTime}/>  
      </>)}
            <NextButton isDisabled={isDisabled} onClick={handleNextButtonClick}/>
            
        </div>



    )

}

export default Appointment

