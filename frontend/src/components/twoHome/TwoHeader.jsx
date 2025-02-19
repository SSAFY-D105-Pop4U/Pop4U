import React from 'react';
import TwoHeaderUtils from './TwoHeaderUtils.jsx';
import  { useState, useEffect } from "react";

const TowHeader = ({handleMenuClick}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
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
    <header id="header" className={isScrolled ? "wbg" : ""}>
      <div className="inner__new">
        <h1>
          <a href="/" className="h__logo">
            <span>Pop4U</span>
          </a>
        </h1>
        <TwoHeaderUtils handleMenuClick={handleMenuClick} />
      </div>
      
      <div className="gnb__bg"></div>
    </header>
  );
};

export default TowHeader;