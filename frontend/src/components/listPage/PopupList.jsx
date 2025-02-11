import "../../styles/components/PopupList.css";
import Divider from "../basic/Divider";

const PopupList = ({ image, title, time, rating }) => {
  return (
    <div>
      <div className="list-popup-card">
        <img src={image} alt={title} className="list-popup-image" />
        <div className="list-popup-content">
          <h3 className="list-popup-title">{title}</h3>
          <p className="list-popup-time">
            <span className="list-popup-icon">🕒</span>
            {time}
            <span className="list-popup-star">⭐</span>
            <span className="list-popup-score">{rating}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupList;
