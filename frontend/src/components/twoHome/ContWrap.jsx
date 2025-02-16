import React from 'react';
import MainVisSection from './MainVisSection';
import MainEachContSection from './MainEachContSection'
import { useEffect, useState } from "react";
import { getPopups } from "../../apis/api/api.js";
import MainEachContSectionBbg from './MainEachContSectionBbg.jsx';


const ContWrap = () => {
  const [popups, setPopups] = useState({});

  useEffect(() => {
      const fetchPopups = async () => {
        try {
          const data = await getPopups();
          setPopups(data);
          console.log("팝업 리스트트 조회완료");
          console.log(data);
          
        } catch (error) {
          console.error("Failed to load popups");
        }
      };
  
      fetchPopups();
    }, []);

  return (
    <div id='contWrap'>
        <div className='main__wrap'>
            <MainVisSection />
            <MainEachContSection popups={popups.byStartDate} title1={"New"} title2={"Pop-up Store"} ex1={"새로운 팝업스토어에서의 특별한 경험이 궁금하다면,"} ex2={"4 U가 전하는 최신 팝업스토어 소식을 만나보세요!"}/>
            <MainEachContSectionBbg popups={popups.byViewCount}/>
            <MainEachContSection popups={popups.byEndDate} title1={"Deadline"} title2={"Pop-up Store"} ex1={"곧 종료되는 팝업스토어를 놓치고 싶지 않다면,"} ex2={"팝 4 U가 전하는 마감 임박 팝업스토어 리스트를 확인해보세요!"}/>
            
        </div>

    </div>
  );
};

export default ContWrap;