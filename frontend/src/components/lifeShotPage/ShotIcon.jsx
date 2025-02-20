import React, { useRef, useState, useEffect} from "react";
import '../../styles/components/ShotIcon.css'
import emoticon1 from'../../assets/emoticon/emoticon1.png'
import emoticon2 from'../../assets/emoticon/emoticon2.png'
import emoticon3 from'../../assets/emoticon/emoticon3.png'
import emoticon4 from'../../assets/emoticon/emoticon4.png'
import emoticon5 from'../../assets/emoticon/emoticon5.png'
import emoticon6 from'../../assets/emoticon/emoticon6.png'
import emoticon7 from'../../assets/emoticon/emoticon7.png'
import emoticon8 from'../../assets/emoticon/emoticon8.png'
import emoticon9 from'../../assets/emoticon/emoticon9.png'
import emoticon10 from'../../assets/emoticon/emoticon10.png'
import emoticon11 from'../../assets/emoticon/emoticon11.png'
import emoticon12 from'../../assets/emoticon/emoticon12.png'
import emoticon13 from'../../assets/emoticon/emoticon13.png'


import { getreviewcheck } from "../../apis/api/api.js";

const ShotIcon = ({ popupId, selectedIcon, setSelectedIcon, onSelectEmoticon }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    // const [emoticons, setEmoticons] = useState([]);

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

    // useEffect(() => {
    //     const fetchPopups = async () => {
    //       try {
    //         const data = await getreviewcheck(popupId);
    //         setEmoticons(data);
    //         console.log("팝업 아이콘 조회" ,data);
    //         console.log(emoticons);
    //       } catch (error) {
    //         console.error("Failed to load popups");
    //       }
    //     };
    
    //     fetchPopups();
    //   }, []);
    

    const emoticons = popupId === "49" ? [
        { id: 1, popupIconImg: emoticon1 },  // P 아이콘
        { id: 2, popupIconImg: emoticon2 },  // 손 흔드는 이모티콘
        { id: 3, popupIconImg: emoticon3 },
        { id: 4, popupIconImg: emoticon4 },
        { id: 5, popupIconImg: emoticon5 },
        { id: 6, popupIconImg: emoticon6 },
        { id: 7, popupIconImg: emoticon7 },
        { id: 8, popupIconImg: emoticon8 },
        { id: 9, popupIconImg: emoticon9 },
        { id: 10, popupIconImg: emoticon10 },
        { id: 11, popupIconImg: emoticon11 },
        { id: 12, popupIconImg: emoticon12 },
        { id: 13, popupIconImg: emoticon13 }
    ] : [];
    
    
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
                            console.log("clicked");
                            setSelectedIcon(emoticon);
                            onSelectEmoticon(emoticon);
                        }}
                    >
                        <img 
                            src={emoticon.popupIconImg} 
                            alt={`emoticon-${emoticon.id}`}
                            className="emoticon-image"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShotIcon;

