import React from 'react';
import searchIcon from '../../assets/icons/teb.png';

const TwoHeaderUtils = () => {
  return (
    <div className="header__util__wrap">
      <div className="mo__search">
        <a href="#!">검색</a>
      </div>

      <div className="mo__burger">
        <a href="#!">메뉴</a>
      </div>
    </div>
  );
};

export default TwoHeaderUtils;