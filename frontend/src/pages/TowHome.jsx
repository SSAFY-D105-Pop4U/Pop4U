import React from 'react';
import TwoHeader from '../components/twoHome/TwoHeader.jsx';
import ContWrap from '../components/twoHome/ContWrap.jsx';
import '../styles/newHome/common.css'
import '../styles/newHome/font.css'
import '../styles/newHome/jquery.fullPage.css'
import '../styles/newHome/main.css'
import '../styles/newHome/nav.css'
import '../styles/newHome/reset.css'
import '../styles/newHome/style_main.css'
import '../styles/newHome/style.css'
import '../styles/newHome/swiper-bundle.min.css'
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";


const TwoHome = () => {
const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드러운 스크롤 효과 추가
    });
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
    
  };

  useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          // 스크롤이 50px 이상이면 `wbg` 클래스 추가
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      
  
      window.addEventListener("scroll", handleScroll);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <div className='wrap' id='wrap'>
      <TwoHeader handleMenuClick={handleMenuClick}/>
      <ContWrap/>   
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {(isScrolled)&&(
          <button class="btn__to__top" onClick={scrollToTop} >
	    위로
	    </button>
        )}
      

    </div>
  );
};

export default TwoHome;
