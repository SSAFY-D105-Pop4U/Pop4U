import { useState, useEffect, useRef } from "react";

const MainEachContSectionBbg = ({ popups }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const wrapperRef = useRef(null);
  const slideRefs = useRef([]);
  const textRefs = useRef([]);
  const slideMargin = 12 * 2;

  useEffect(() => {
    if (!popups || popups.length === 0) return;

    const firstSlide = slideRefs.current[0];
    if (firstSlide) {
      const rect = firstSlide.getBoundingClientRect();
      setSlideWidth(rect.width + slideMargin);
    }
  }, [popups]);

  useEffect(() => {
    if (!popups || popups.length === 0 || slideWidth === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % popups.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [popups, slideWidth]);

  useEffect(() => {
    if (!popups || popups.length === 0 || slideWidth === 0) return;

    const viewportWidth = wrapperRef.current?.parentElement?.offsetWidth || 0;
    const newTranslateX = -(activeIndex * slideWidth) + viewportWidth / 2 - slideWidth / 2;
    setTranslateX(newTranslateX);
  }, [activeIndex, popups, slideWidth]);

  // ✅ animate 클래스가 한 번만 추가되도록 처리
  useEffect(() => {
    if (!textRefs.current[activeIndex]) return;

    // 기존 클래스 제거
    textRefs.current.forEach((el, idx) => {
      if (el) {
        el.classList.remove("animate");
      }
    });

    // 현재 슬라이드에 animate 추가
    const activeText = textRefs.current[activeIndex];
    if (activeText) {
      activeText.classList.add("animate");
    }
  }, [activeIndex]);

  return (
    <div className="main__each__cont section bbg" id="hyundaiWayYn">
      <div className="main__each__ttl_wrap">
        <div className="inner__new">
          <div className="main__each__ttl">
            <strong>
              Popular <br className="for_mob" />
              Pop-up Store
            </strong>
            <a href="#" className="v__more" data-type="way">
              VIEW MORE
            </a>
          </div>
          <div className="main__each__desc sub1">
            <p>
              지금 가장 핫한 팝업스토어가 궁금하다면, <br /> 팝 4 U가 전하는 인기 팝업스토어 리스트를 확인해보세요!
            </p>
          </div>
        </div>
      </div>

      <div className="main__each__way_wrap">
        <div className="img__swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
          <div
            className="swiper-wrapper"
            style={{
              display: "flex",
              transform: `translate3d(${translateX}px, 0px, 0px)`,
              transition: "transform 1000ms ease-out",
            }}
            ref={wrapperRef}
          >
            {(popups || []).map((items, index) => {
              let slideClass = "swiper-slide";
              const prevIndex = (activeIndex - 1 + popups.length) % popups.length;
              const nextIndex = (activeIndex + 1) % popups.length;

              if (index === prevIndex) {
                slideClass += " swiper-slide-prev";
              } else if (index === activeIndex) {
                slideClass += " swiper-slide-active";
              } else if (index === nextIndex) {
                slideClass += " swiper-slide-next";
              }

              return (
                <div
                  key={items.popupId}
                  style={{ margin: `${slideMargin / 2}px` }}
                  className={slideClass}
                  ref={(el) => (slideRefs.current[index] = el)}
                  role="group"
                  aria-label={`${index + 1}/${popups.length}`}
                >
                  <span style={{ backgroundImage: `url(${items.popupImages[0]})` }}></span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ 텍스트 슬라이드 */}
        <div className="text__swiper">
          {(popups || []).map((items, index) => {
            return (
              <div
                key={items.popupId}
                className={`center__lyr ${index === activeIndex ? "active" : ""}`}
                ref={(el) => (textRefs.current[index] = el)}
              >
                <p className="korTxt">{items.popupName}</p>
                <strong>{items.popupRegion}</strong>
                <div className="way__side__pagination">
                  <span>{activeIndex + 1}</span><b>/</b><span className="total">{popups.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainEachContSectionBbg;
