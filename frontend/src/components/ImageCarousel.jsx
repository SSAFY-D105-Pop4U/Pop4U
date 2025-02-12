import React, { useState, useRef } from "react";
import "../styles/components/ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const isSingleImage = !images || images.length <= 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);

  // ✅ 다음 이미지로 이동
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // ✅ 이전 이미지로 이동
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // ✅ 최소 스와이프 거리
  const minSwipeDistance = 50;

  // ✅ 터치 시작
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  // ✅ 터치 이동
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // ✅ 터치 종료
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // ✅ 마우스 드래그 시작
  const onMouseDown = (e) => {
    e.preventDefault(); // 드래그 시 이미지 선택 방지
    setIsDragging(true);
    setStartX(e.clientX);
  };

  // ✅ 마우스 드래그 중
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // 드래그 시 텍스트 선택 방지
    
    const currentX = e.clientX;
    const diff = currentX - startX;
    
    const track = carouselRef.current.querySelector('.carousel-track');
    if (track) {
      const translateX = -currentIndex * 100 + (diff / track.offsetWidth) * 100;
      track.style.transform = `translateX(${translateX}%)`;
      track.style.transition = 'none';
    }
  };

  // ✅ 마우스 드래그 종료
  const onMouseUp = (e) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    const track = carouselRef.current.querySelector('.carousel-track');
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff < 0) {
        nextImage();
      } else {
        prevImage();
      }
    } else {
      // 최소 거리를 못 넘었을 경우 원위치
      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        track.style.transition = 'transform 0.3s ease-out';
      }
    }
    
    setIsDragging(false);
  };

  // ✅ 마우스가 요소를 벗어났을 때
  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      const track = carouselRef.current.querySelector('.carousel-track');
      if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        track.style.transition = 'transform 0.3s ease-out';
      }
    }
  };

  

  // ✅ CSS 스타일 추가
  const trackStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    userSelect: 'none', // 텍스 트 선택 방지
    WebkitUserSelect: 'none', // Safari를 위한 설정
  };

  return (
    <div
      className="image-container"
      ref={carouselRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ userSelect: 'none' }}
    >
      {isSingleImage ? (
        <img
          src={images.length > 0 ? images[0] : "https://via.placeholder.com/414x414"}
          alt="event"
          className="image"
          draggable="false"
        />
      ) : (
        <div 
          className="carousel-track" 
          style={trackStyle}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img 
                src={image} 
                alt={`popup-${index}`} 
                className="carousel-image" 
                draggable="false"
              />
            </div>
          ))}
        </div>
      )}

      {/* ✅ 하단 인디케이터 */}
      {!isSingleImage && (
        <div className="indicator-container">
          {images.map((_, index) => (
            <span key={index} className={`indicator ${currentIndex === index ? "active" : ""}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
