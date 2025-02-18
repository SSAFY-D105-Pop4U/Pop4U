import React, { useEffect, useState } from 'react';
// instance.js에서 내보낸 api 인스턴스를 import 합니다.
import api from '../../apis/api/instance'; 
import '../../styles/components/Suggest.css';

const Suggest = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get("/category/user/recommendation")
      .then(response => {
        const data = response.data;
        // 각 추천 팝업스토어 데이터에서 첫번째 이미지와 팝업스토어 이름만 추출
        const newCards = data.map(item => ({
          image: (item.popupImages && item.popupImages.length > 0) 
                    ? item.popupImages[0] 
                    : 'https://via.placeholder.com/300', // 이미지가 없으면 대체 이미지 사용
          title: item.popupName,
        }));
        setCards(newCards);
      })
      .catch(error => {
        console.error("Error fetching recommended popup stores:", error);
      });
  }, []);

  return (
    <div className="suggest-card-grid">
      {cards.map((card, index) => (
        <div className="suggest-card" key={index}>
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