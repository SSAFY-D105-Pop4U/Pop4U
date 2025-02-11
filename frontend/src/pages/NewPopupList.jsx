import Header from "../components/public/Header";
import Filter from "../components/listPage/Filter";
import Divider from "../components/public/Divider";
import PopupList from "../components/listPage/PopupList";
import "../styles/pages/AreaList.css";

const NewPopupList = () => {
  const popupData = [
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",
      title: "핑구 팝업스토어 in 잠실",
    },
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",
      title: "핑구 팝업스토어 in 잠실",
    },
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d",
      title: "핑구 팝업스토어 in 잠실",
    },
  ];

  return (
    <div>
      <div className="area-list-header">
        <Header title="새로 생긴 팝업스토어" />
        <Filter showSort={false} />
      </div>

      {popupData.map((data, index) => (
        <div key={index}>
          <PopupList image={data.image} title={data.title} />
          <Divider height="2px" />
        </div>
      ))}
    </div>
  );
};

export default NewPopupList;
