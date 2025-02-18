import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../apis/api/instance'; 
import '../../styles/components/Suggest.css';

const Suggest = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/category/user/recommendation")
      .then(response => {
        const data = response.data;
        // 각 추천 팝업스토어 데이터에서 첫번째 이미지, 팝업스토어 이름, popupId 추출
        const newCards = data.map(item => ({
          popupId: item.popupId,
          image: (item.popupImages && item.popupImages.length > 0) 
                    ? item.popupImages[0] 
                    : 'https://via.placeholder.com/300', // 이미지가 없으면 대체 이미지 사용
          title: item.popupName,
        }));
        // 최대 6개만 추출
        setCards(newCards.slice(0, 6));
      })
      .catch(error => {
        console.error("Error fetching recommended popup stores:", error);
      });
  }, []);

  const handleCardClick = (popupId) => {
    // 상세페이지로 이동 (예: /popup/{popupId})
    navigate(`/popup/${popupId}`);
  };

  return (
    <div className="suggest-card-grid">
      {cards.map((card, index) => (
        <div 
          className="suggest-card" 
          key={index}
          onClick={() => handleCardClick(card.popupId)}
          style={{ cursor: 'pointer' }}
        >
          <img src={card.image} alt={card.title} className="card-image" />
          <div className="suggest-card-overlay">
            <h3 className="suggest-card-title">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggest;