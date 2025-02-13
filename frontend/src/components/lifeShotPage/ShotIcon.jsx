import React, { useRef, useState } from "react";
import '../../styles/components/ShotIcon.css'

const ShotIcon = ({ selectedIcon, setSelectedIcon, onSelectEmoticon }) => {
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

    const emoticons = [
        {
            id: 1,
            url: "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",  // P 아이콘
        },
        {
            id: 2,
            url: "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",  // 손 흔드는 이모티콘
        },
        {
            id: 3,
            url: "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",  // 양손 든 이모티콘
        },
        {
            id: 4,
            url: "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",  // 놀란 이모티콘
        },
        {
            id: 5,
            url: "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",  // 하트 든 이모티콘
        },
        {
            id: 6,
            url: "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",  // 웃는 이모티콘
        }
    ];
    
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
                            src={emoticon.url} 
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

