import { useRef, useState, useEffect} from "react";


const MainEachContSection = ({popups, title1, title2, ex1, ex2}) => {
  
  const wrapperRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    console.log( "gkdl",popups);
    if (wrapperRef.current) {
      const slide = wrapperRef.current.children[0];
      if (slide) {
        const width = slide.offsetWidth;
        setSlideWidth(width);

        const wrapperWidth = width * popups.length;
        setContainerWidth(wrapperWidth);

        const viewportWidth = wrapperRef.current.parentElement.offsetWidth;
        setMaxTranslateX(viewportWidth - wrapperWidth); // 마지막 슬라이드가 오른쪽 끝에 붙도록 제한
      }
    }
  }, [popups]);

  // 드래그 시작 (마우스 & 터치)
  const handleStart = (e) => {
    setDragging(true);
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setCurrentX(translateX);
  };

  // 드래그 중 (마우스 & 터치)
  const handleMove = (e) => {
    if (!dragging) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    setTranslateX(currentX + deltaX);
  };

  // 드래그 종료 (마우스 & 터치)
  const handleEnd = () => {
    setDragging(false);
    let newTranslateX = Math.round(translateX / slideWidth) * slideWidth;

    // 최소 & 최대 값 제한
    if (newTranslateX > 0) newTranslateX = 0;
    if (newTranslateX < maxTranslateX) newTranslateX = maxTranslateX;

    setTranslateX(newTranslateX);
  };
  
  return (
    <div className='main__each__cont section' id="arcicleYn">
        <div className='inner__new'>
          <div className="main__each__ttl_wrap">
                <div className="main__each__ttl">
						  <strong>{title1} <br className="for_mob"/>{title2}</strong>
						<a href="" className="v__more" data-type="arc">VIEW MORE</a>

            <div className="main__each__desc sub2">{ex1}<br/> {ex2}</div>
            
           
            
				</div>

          </div>

          <div className="main__working__list_wrap" >
              <div className="working__list__cards swiper-initialized swiper-horizontal swiper-ios swiper-backface-hidden">
                  <div
                    ref={wrapperRef}
                   className="swiper-wrapper" id="arcList" aria-live="polite" 
                   style={{
                    display: "flex",
                    width: `${containerWidth}px`, // 전체 슬라이드 너비 설정
                    transform: `translate3d(${translateX}px, 0px, 0px)`,
                    transition: dragging ? "none" : "transform 0.3s ease-out",
                    cursor: dragging ? "grabbing" : "grab",
                  }}
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart} // 터치 시작
                  onTouchMove={handleMove} // 터치 이동
                  onTouchEnd={handleEnd} // 터치 종료 
      >



                  {(popups || []).map((item, index) => (
                    <div className="swiper-slide arcDiv swiper-slide-active" role="group" aria-label={`${index + 1}/${popups.length}`} key={item.popupId} >

                        <div className="working__img_wrap">
                            <img src={item.popupImages[0]}/>
                        </div>

                        <div className="working__card__cont">
                          <div className="working__cont__top">
                            <strong>{item.popupName}</strong>
                            <a href="/culture/1767/articleView.hc" className="arrow__link gray"></a>
                          </div>

                          <div className="working__cont__btm">
                            <p>{item.popupOperationTime}</p>
                          </div>
                        </div>
                    </div>))}

                    

                    
                    
                    

                  </div>

                  
              </div>
          </div>
            
        </div>

    </div>
  );
};

export default MainEachContSection;


