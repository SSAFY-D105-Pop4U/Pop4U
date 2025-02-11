import React, { useState, useRef } from "react";
import "../styles/components/ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const isSingleImage = !images || images.length <= 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);

  // ✅ 다음 이미지로 이동
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // ✅ 이전 이미지로 이동
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // ✅ 마우스 클릭 시 시작 위치 저장
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  // ✅ 마우스 이동 시 슬라이드 변경
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    if (moveX > 50) {
      prevImage();
      setIsDragging(false);
    } else if (moveX < -50) {
      nextImage();
      setIsDragging(false);
    }
  };

  // ✅ 마우스 클릭 해제 시 드래그 상태 해제
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // ✅ 마우스 휠로 슬라이드 이동 (아래로 → 다음, 위로 → 이전)
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      nextImage();
    } else {
      prevImage();
    }
  };

  // ✅ 화면 사이드 클릭 시 슬라이드 이동
  const handleSideClick = (e) => {
    const { clientX, target } = e;
    const { width, left } = target.getBoundingClientRect();
    const clickPosition = clientX - left;

    if (clickPosition < width / 2) {
      prevImage();
    } else {
      nextImage();
    }
  };

  return (
    <div
      className="image-container"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleSideClick}
    >
      {isSingleImage ? (
        <img
          src={images.length > 0 ? images[0] : "https://via.placeholder.com/414x414"}
          alt="event"
          className="image"
        />
      ) : (
        <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`popup-${index}`} className="carousel-image" />
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
