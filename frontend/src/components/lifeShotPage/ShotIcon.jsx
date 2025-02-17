import React, { useRef, useState, useEffect } from "react";
import '../../styles/components/ShotIcon.css'
import api from "../../apis/api/instance";
import { getreviewcheck } from "../../apis/api/api.js";

const ShotIcon = ({ popupId, selectedIcon, setSelectedIcon, onSelectEmoticon }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // 드래그 시작
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    // 드래그 중
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // 드래그 종료
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // 터치 이벤트 핸들러
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

    

const [emoticons, setEmoticons] = useState([]);

  // 컴포넌트 마운트 시 백엔드에서 이모티콘 목록을 불러옵니다.
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await getreviewcheck(popupId);
        // API 응답 구조에 맞게 데이터를 처리 (예: response.data)
        
        
        setEmoticons(response.data);
        console.log(emoticons);
      } catch (error) {
        console.error("이모티콘을 불러오는 중 오류 발생:", error);
      }
    };

    if (popupId) {
      fetchIcons();
    }
  }, [popupId]);
    
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
                {Array.isArray(emoticons) ? (
    emoticons.map((emoticon) => (
        <div
            key={emoticon.id}
            className={`emoticon-item ${selectedIcon?.id === emoticon.id ? "selected" : ""}`}
            onClick={() => {
                console.log("clicked", emoticon);
                setSelectedIcon(emoticon);
                if (onSelectEmoticon) {
                    onSelectEmoticon(emoticon);
                } else {
                    console.warn("onSelectEmoticon이 정의되지 않았습니다.");
                }
            }}
        >
            {emoticon.popupIconImg}
            <img 
                src={emoticon.popupIconImg} 
                alt={`emoticon-${emoticon.id}`}
                className="emoticon-image"
                draggable={false}
                onError={(e) => console.error("Image failed to load:", e.target.src)}
            />
        </div>
    ))
) : (
    <p>이모티콘 데이터를 불러오는 중...</p>
)}



            </div>
        </div>
    )
}

export default ShotIcon;

