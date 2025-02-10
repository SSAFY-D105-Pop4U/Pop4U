import { useRef, useState, useEffect } from "react";

const Drag = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const handleTouchMove = (e) => {
      if (isDragging) {
        const deltaX = Math.abs(e.touches[0].pageX - startX);
        const deltaY = Math.abs(e.touches[0].pageY - startY);

        if (deltaY > deltaX) {
          setIsDragging(false); // ✅ 가로 스크롤 중단
          return;
        }

        if (deltaX > deltaY && e.cancelable) {
          e.preventDefault(); // ✅ 가로 스크롤 시 preventDefault() 실행
        }
      }
    };

    scrollElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      scrollElement.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  // 🖱️ 마우스 드래그 시작
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 🖱️ 마우스 드래그 중
  const handleMouseMove = (e) => {
    if (!isDragging || e.buttons !== 1) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
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
    setStartY(e.touches[0].pageY);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 📱 터치 드래그 중
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 📌 마우스가 `scroll-container` 밖으로 나가면 드래그 종료
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 📱 터치 드래그 종료
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default Drag;
