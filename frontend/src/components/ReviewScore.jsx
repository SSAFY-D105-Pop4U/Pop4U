import { useEffect,useState } from "react";
import fullstar from "../assets/icons/fullstar.png";
import "../styles/components/ReviewScore.css";


const ReviewScore = ({ reviewRatings }) => {  
  const [average, setAverage] = useState(0); // 평균값 상태 관리


  useEffect(() => {
      if (reviewRatings && reviewRatings.length > 0) { // 데이터가 있는 경우만 처리
      const sum = reviewRatings.reduce((acc, cur) => acc + cur, 0); // 모든 점수 합산
      const avg = sum / reviewRatings.length; // 개수로 나눠 평균 계산
      setAverage(avg.toFixed(1)); // 소수점 한 자리까지 반올림하여 저장
    }
  }, [reviewRatings]);

  return (
    <div>
      <div className="score">
        <img src={fullstar} alt="fullstar" className="star" />
        <div className="average">{average}</div>
        <div className="total">/5 </div>
      </div>
    </div>
  );
};

export default ReviewScore;
