import Header from "../components/basic/Header";
import Filter from "../components/listPage/Filter";
import Divider from "../components/basic/Divider";
import PopupList from "../components/listPage/PopupList";

const EndingPopupList = () => {
  const popupData = [
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",
      title: "핑구 팝업스토어 in 잠실",
    },
    // ... 더미 데이터
  ];

  return (
    <div className="new-popup-container">
      <div className="new-popup-header">
        <Header title="마감 임박 팝업스토어" />
        <Filter showSort={false} />
      </div>

      {popupData.map((data, index) => (
        <div key={index} className="new-popup-list-item">
          <PopupList image={data.image} title={data.title} />
          <Divider height="2px" />
        </div>
      ))}
    </div>
  );
};

export default EndingPopupList;
