import Header from "../components/public/Header";
import DateSelector from "../components/listPage/DateSelector";
import { useSearchParams } from "react-router-dom";
import Filter from "../components/listPage/Filter";
import Divider from "../components/public/Divider";
import PopupList from "../components/listPage/PopupList";
import "../styles/pages/AreaList.css";
const AreaList = () => {
  const [searchParams] = useSearchParams(); // ✅ `useSearchParams` 추가
  const type = searchParams.get("area");

  const popupData = [
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d", // 이미지 URL
      title: "핑구 팝업스토어 in 잠실",
      time: "11:00 ~ 20:00",
      rating: 5.0,
    },
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d", // 이미지 URL
      title: "핑구 팝업스토어 in 잠실",
      time: "11:00 ~ 20:00",
      rating: 5.0,
    },
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d", // 이미지 URL
      title: "핑구 팝업스토어 in 잠실",
      time: "11:00 ~ 20:00",
      rating: 5.0,
    },
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d", // 이미지 URL
      title: "핑구 팝업스토어 in 잠실",
      time: "11:00 ~ 20:00",
      rating: 5.0,
    },
    {
      image:
        "https://d8nffddmkwqeq.cloudfront.net/store/e70ff60a%2Cf631%2C482e%2Cb5bf%2Cfa2e4ac0948d", // 이미지 URL
      title: "핑구 팝업스토어 in 잠실",
      time: "11:00 ~ 20:00",
      rating: 5.0,
    },
  ];

  return (
    <div>
      <div className="area-list-header">
        <Header title={type} />
        <DateSelector />
        <Filter />
      </div>

      {popupData.map((data, index) => (
        <div>
          <PopupList
            key={index}
            image={data.image}
            title={data.title}
            time={data.time}
            rating={data.rating}
          />
          <Divider height="2px" />
        </div>
      ))}
    </div>
  );
};

export default AreaList;
