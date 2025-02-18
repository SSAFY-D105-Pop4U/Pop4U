import "../styles/components/Info.css";
import fullpin from "../assets/icons/fullpin.png";


const Info = ({ detail }) => {
  if (!detail) return <p>Loading...</p>; // ✅ detail이 null일 때 로딩 표시

  return (
    <div className="detail-info-contain">
      <div className="info">
        
        <div className="detial-title">
          오픈 기간
        </div>
        <div className="detail-date">
          <div className="startdate">{detail.popupStartDate}~</div>
          <div className="enddate">{detail.popupEndDate}</div>
        </div>

        <div className="detial-title">
          주소
        </div>
        <div className="detail-date">
          {/* <img src={fullpin} alt="pin" className="pin" /> */}
          <div className="add">{detail.popupAddress}</div>
        </div>
        <div className="detial-title">운영시간</div>
        <div className=" opentime">
          
          <div className="detail-date">{detail.popupOperationTime}</div>
        </div>
        <div className="detial-title" >팝업스토어 소개</div>
        <div className="detail-date">{detail.popupDescription}</div>
      </div>
    </div>
  );
};

export default Info;
