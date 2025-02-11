import "../../styles/components/PopupList.css";
import Divider from "../public/Divider";

const PopupList = ({ image, title, popupAddress, date}) => {
  return (
    <div>
      <div className="list-popup-card">
        <img src={image} alt={title} className="list-popup-image" />
        <div className="list-popup-content">
          <h3 className="list-popup-title">{title}</h3>
          <p className="list-popup-time">
            <span className="list-popup-icon">📍</span>
            {popupAddress}
          </p>
          <div className="popup-date">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default PopupList;
