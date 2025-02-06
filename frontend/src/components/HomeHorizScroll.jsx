import { useRef, useState } from "react";
import popup1Image from "../assets/images/popup1.png";
import "../styles/HomeHorizScroll.css";

const HomeHorizScroll = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const items = [
    {
      description: "스미코구라시 팝업스토어 <스미코구라시의 행복한 시간>",
      image: popup1Image,
    },
    {
      description: "마블 팝업스토어 <캡틴아메리카의 행복한 타피오카>",
      image: "/images/coach-marble.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
    {
      description: "다른 팝업스토어의 소개를 여기에 추가할 수 있습니다.",
      image: "/images/another-event.jpg",
    },
  ];

  // 🖱️ 마우스 드래그 시작 (왼쪽 버튼 클릭 시)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // 왼쪽 버튼(0) 클릭일 때만 실행
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 🖱️ 마우스 드래그 중 (버튼이 눌린 상태에서만)
  const handleMouseMove = (e) => {
    if (!isDragging || e.buttons !== 1) return; // 왼쪽 버튼이 눌려 있을 때만 실행
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 이동 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 🖱️ 마우스 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 📱 터치 드래그 시작
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 📱 터치 드래그 중
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 이동 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 📱 터치 드래그 종료
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="horizontal-scroll">
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`card ${index === 0 ? "first-card" : ""} ${
              index === items.length - 1 ? "last-card" : ""
            }`}
          >
            <img src={popup1Image} alt={item.title} className="card-image" />
            <div className="card-content">
              <p className="card-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeHorizScroll;
