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
        const newCards = data.map(item => ({
          popupId: item.popupId,
          image: (item.popupImages && item.popupImages.length > 0)
                    ? item.popupImages[0]
                    : 'https://via.placeholder.com/300', // 대체 이미지
          title: item.popupName,
          subtitle: item.popupName  // 혹은 다른 설명 문자열 사용
        }));
        setCards(newCards.slice(0, 6));
      })
      .catch(error => {
        console.error("Error fetching recommended popup stores:", error);
      });
  }, []);

  const handleCardClick = (popupId) => {
    navigate(`/detail?popupId=${popupId}`);
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
