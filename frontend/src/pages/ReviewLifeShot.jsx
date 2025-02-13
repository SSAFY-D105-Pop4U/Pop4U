import { useNavigate } from 'react-router-dom';
import Header from "../components/basic/Header";
import ReviewLifeShotCard from '../components/ReviewLifeShotCard';
import '../styles/pages/ReviewLifeShot.css';
import Divider from '../components/basic/Divider';
import { useEffect } from 'react';
import { getmyreservation } from '../apis/api/api';


const ReviewLifeShot = () => {
  const navigate = useNavigate();
  const title = "리뷰&인생네컷";



  useEffect(() =>{
    try {
            const data =  getmyreservation();
            setPopups(data);
            console.log("팝업 리스트트 조회완료");
          } catch (error) {
            console.error("Failed to load popups");
          }
  },[])
 


  // 실제 데이터로 교체 필요
  const placeInfo = {
    name: "스미코구라시 팝업스토어",
    image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a"
  };

  return (
    <div>
      <div className='review-life-header'>
        <Header title={title} />
      </div>
      <ReviewLifeShotCard placeInfo={placeInfo} isReview={true} />

      <Divider top='0px'/>

      <ReviewLifeShotCard placeInfo={placeInfo} />

      <Divider top='0px'/>
    </div>
  );
};

export default ReviewLifeShot; 