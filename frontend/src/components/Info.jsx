import "../styles/components/Info.css";
import fullpin from "../assets/icons/fullpin.png";


const Info = ({ detail }) => {
  if (!detail) return <p>Loading...</p>; // ✅ detail이 null일 때 로딩 표시

  return (
    <div>
      <div className="info">
        <div className="name">{detail.popupName}</div>
        <div className="date">
          <div className="startdate">{detail.popupStartDate}~</div>
          <div className="enddate">{detail.popupEndDate}</div>
        </div>
        <div className="address">
          <img src={fullpin} alt="pin" className="pin" />
          <div className="add">{detail.popupAddress}</div>
        </div>
        <div className=" opentime">
          <div className="time">운영시간</div>
          <div className="popupOperationTime">{detail.popupOperationTime}</div>
        </div>
        <div className="title">팝업스토어 소개</div>
        <div className="des">{detail.popupDescription}</div>
      </div>
    </div>
  );
};

export default Info;
