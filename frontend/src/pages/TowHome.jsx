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


const TwoHome = () => {

  return (
    <div className='wrap' id='wrap'>
      <TwoHeader />
      <ContWrap/>   

    </div>
  );
};

export default TwoHome;
