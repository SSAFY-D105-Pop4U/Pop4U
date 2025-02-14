import Header from "../components/basic/Header";
import DateSelector from "../components/listPage/DateSelector";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/listPage/Filter";
import Divider from "../components/basic/Divider";
import PopupList from "../components/listPage/PopupList";
import "../styles/pages/AreaList.css";
import {getPopupsRegion} from "../apis/api/api.js";
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

const AreaList = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("area");
  const [popups, setPopups] = useState([]);
  const [selectedSort, setSelectedSort] = useState("정렬"); // 정렬기준
  const [selectedDate, setSelectedDate] = useState(""); // 날짜선택

  const area = type.split("/")
  
  const nav = useNavigate();

  
const popupsRegion = async () => {
  try {
    const results = await Promise.all(area.map(region => getPopupsRegion(region)));
    
    setPopups(prevPopups => [...prevPopups, ...results.flat()]);
// 이전 상태 유지하면서 업데이트
    console.log("API 응답 (팝업상세):", results);
  } catch (error) {
    console.error("Failed to load popups", error);
  }
};

useEffect(() => {
  popupsRegion(); // 컴포넌트가 마운트될 때 실행
}, []);

  // selectedSort 값이 변경될 때마다 정렬 수행
  useEffect(() => {
    let sortedPopups = [...popups];
    
    switch(selectedSort) {
      case "최신순":
        sortedPopups.sort((a, b) => new Date(b.popupStartDate) - new Date(a.popupStartDate));
        break;
      case "마감순":
        sortedPopups.sort((a, b) => new Date(a.popupEndDate) - new Date(b.popupEndDate));
        break;
      case "인기순":
        sortedPopups.sort((a, b) => b.popupMaximumPeople - a.popupMaximumPeople);
        break;
      default:
        break;
    }
    
    setPopups(sortedPopups);
  }, [selectedSort]);

  const handlePopupClick = (id) => {
    console.log("팝업 ID:", id);
    nav(`/detail?popupId=${id}`);
  };
  
  return (
    <div>
      
      <div className="area-list-header">
        <Header title={type} />
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <Filter selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>

      {popups
        .filter(data => {
          if (!selectedDate) return true; // 날짜가 선택되지 않았으면 모든 팝업 표시
          const startDate = new Date(data.popupStartDate);
          const endDate = new Date(data.popupEndDate);
          // selectedDate를 현재 연도의 날짜로 변환
          const [month, day] = selectedDate.split('.');
          const currentYear = new Date().getFullYear();
          const selected = new Date(currentYear, parseInt(month) - 1, parseInt(day));
          return selected >= startDate && selected <= endDate;
        })
        .map((data, index) => (
          <div 
            key={data.id || `popup-${index}`}
            onClick={() => handlePopupClick(data.popupId)}
            style={{ cursor: 'pointer' }}
          >
            <PopupList
              image={data.popupImages[0]}
              title={data.popupName}
              popupAddress={data.popupAddress.split(' ').slice(0, 2).join(' ')}
              date={`${data.popupStartDate.slice(2,4)}.${data.popupStartDate.slice(5,7)}.${data.popupStartDate.slice(8,10)} - ${data.popupEndDate.slice(2,4)}.${data.popupEndDate.slice(5,7)}.${data.popupEndDate.slice(8,10)}`}
            />
            <Divider height="2px" />
          </div>
        ))}
    </div>
  );
};

export default AreaList;
