// src/components/lifeShotPage/ShotIcon.jsx
import React, { useRef, useState, useEffect } from "react";
import api from "../../apis/api/instance";
import '../../styles/components/ShotIcon.css';

const ShotIcon = ({ popupId, selectedIcon, setSelectedIcon, onSelectEmoticon }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [emoticons, setEmoticons] = useState([]);

  // 컴포넌트 마운트 시 백엔드에서 이모티콘 목록을 불러옵니다.
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await api.get(`/four_cuts/${popupId}`);
        // API 응답 구조에 맞게 데이터를 처리 (예: response.data)
        setEmoticons(response.data);
      } catch (error) {
        console.error("이모티콘을 불러오는 중 오류 발생:", error);
      }
    };

    if (popupId) {
      fetchIcons();
    }
  }, [popupId]);

  // 마우스/터치 드래그 이벤트 핸들러들
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div>
      <div 
        ref={scrollRef}
        className="emoticon-picker"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {emoticons.map((emoticon) => (
          <div
            key={emoticon.id}
            className={`emoticon-item ${selectedIcon?.id === emoticon.id ? "selected" : ""}`}
            onClick={() => {
              console.log("아이콘 선택됨:", emoticon);
              setSelectedIcon(emoticon);
              onSelectEmoticon(emoticon);
            }}
          >
            <img 
              src={emoticon.url} 
              alt={`emoticon-${emoticon.id}`}
              className="emoticon-image"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShotIcon;
