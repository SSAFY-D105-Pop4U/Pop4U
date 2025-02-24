import React from 'react';
import searchIcon from '../../assets/icons/teb.png';
import { useNavigate } from "react-router-dom";

const TwoHeaderUtils = ({handleMenuClick}) => {
  
 
  const nav = useNavigate();
    const handleSearchClick = () => {
      nav(`/search`);
    };

    
  
  return (
    <div className="header__util__wrap">
      <div className="mo__search" onClick={handleSearchClick}>
        <a >검색</a>
      </div>

      <div className="mo__burger" onClick={handleMenuClick}>
        <a >메뉴</a>
      </div>
    </div>
  );
};

export default TwoHeaderUtils;