import "../../styles/components/HomeArea.css";
import { useNavigate } from "react-router-dom";

const HomeArea = () => {
  const areas = [
    { label: "서울", icon: busanIcon },
    { label: "경기/인천", icon: busanIcon },
    { label: "강원도", icon: busanIcon },
    { label: "경남/부산", icon: busanIcon },
    { label: "경북/대구", icon: busanIcon },
    { label: "충청/대전", icon: busanIcon },
    { label: "전라/광주", icon: busanIcon },
    { label: "제주도", icon: busanIcon },
  ];

  const nav = useNavigate();

  const handleSendText = (type) => {
    nav(`/areaList?area=${type}`);
  };
  return (
    <div>
      <div className="grid-container">
        {areas.map((area, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={() => handleSendText(area.label)}
          >
            <div className="icon">
              <img src={area.icon} alt={area.label} />
            </div>
            <div className="label">{area.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeArea;
