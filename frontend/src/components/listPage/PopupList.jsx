import "../../styles/components/PopupList.css";
import Divider from "../basic/Divider";
import locationIcon from "../../assets/icons/location.svg";

const PopupList = ({ image, title, popupAddress, date}) => {
  return (
    <div>
      <div className="list-popup-card">
        <img src={image} alt={title} className="list-popup-image" />
        <div className="list-popup-content">
          <h3 className="list-popup-title">{title}</h3>
          <p className="list-popup-time">
            <img 
              src={locationIcon} 
              alt="location" 
              className="list-popup-icon"
              style={{ width: '12px', height: '12px' }}
            />
            {popupAddress}
          </p>
          <div className="popup-date">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default PopupList;
