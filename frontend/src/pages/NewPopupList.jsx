import Header from "../components/basic/Header";
import Filter from "../components/listPage/Filter";
import Divider from "../components/basic/Divider";
import PopupList from "../components/listPage/PopupList";
import "../styles/pages/AreaList.css";
import { getAllPopups } from "../apis/api/api";
import { useEffect, useState } from "react";

const NewPopupList = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가
  const [selectedSort, setSelectedSort] = useState("정렬"); // 정렬기준

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

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const data = await getAllPopups();
        if (data && data.all) {
          setPopups(data.all); // ✅ API에서 받아온 popups 상태 업데이트
          console.log(data.all);
          
        } else {
          setPopups([]); // 데이터가 없을 경우 빈 배열 할당
        }
        console.log("팝업 리스트 조회 완료", data);
      } catch (error) {
        console.error("Failed to load popups", error);
        setPopups([]); // 오류 발생 시 빈 배열로 초기화
      } finally {
        setLoading(false); // ✅ 로딩 완료
      }
    };

    fetchPopups();
  }, []);

  return (
    <div>
      <div className="area-list-header">
        <Header title="Pop4U" />
        <Filter selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>

      {/* ✅ 로딩 중일 때 메시지 표시 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : popups.length > 0 ? (
        popups.map((popup, index) => (
          <div key={index}>
            <PopupList 
              image={popup.popupImages[0]} 
              title={popup.popupName} 
              popupAddress={popup.popupAddress.split(' ').slice(0, 2).join(' ')}  
              date={`${popup.popupStartDate.slice(2,4)}.${popup.popupStartDate.slice(5,7)}.${popup.popupStartDate.slice(8,10)} - ${popup.popupEndDate.slice(2,4)}.${popup.popupEndDate.slice(5,7)}.${popup.popupEndDate.slice(8,10)}`}
              />
            <Divider height="2px" />
          </div>
        ))
      ) : (
        <p>현재 새로 생긴 팝업스토어가 없습니다.</p>
      )}
    </div>
  );
};

export default NewPopupList;
