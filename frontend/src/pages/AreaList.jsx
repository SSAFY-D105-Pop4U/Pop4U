import Header from "../components/basic/Header";
import DateSelector from "../components/listPage/DateSelector";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/listPage/Filter";
import Divider from "../components/basic/Divider";
import PopupList from "../components/listPage/PopupList";
import "../styles/pages/AreaList.css";
import {getPopupsRegion} from "../apis/api/api.js";
import {useEffect, useState} from 'react'
const AreaList = () => {
  const [searchParams] = useSearchParams(); // ✅ `useSearchParams` 추가
  const type = searchParams.get("area");
  const [popups, setPopups] = useState([]);
  
  const popupsRegion = async () => {
      try {
        const data = await getPopupsRegion("서울");
        setPopups(data);
        console.log("API 응답 (팝업상세):", data);
      } catch (error) {
        console.error("Failed to load popups");
      }
    };

    useEffect(() => {
      popupsRegion();
    }, []);
  
  return (
    <div>
      <div className="area-list-header">
        <Header title={type} />
        <DateSelector />
        <Filter />
      </div>

      {popups.map((data, index) => (
        <div>
          <PopupList
            key={index}
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
