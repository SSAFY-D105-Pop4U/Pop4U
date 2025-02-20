import Header from "../components/basic/Header"
import Swipe from "../components/reservation/Swipe"
import '../styles/pages/Reservation.css'
import {useState} from "react"
const Reservation = () => {

    const [popupId, setPopupId] = useState(0);
    

    const handleRemoveClick = () => {
        console.log(popupId);
      };
    
    return (
        <div>
            <Header title={"내 예약"}/>
            <div className="card-container">
                <Swipe type={"예약"} setPopupId={setPopupId}/>
                <div className="update-time">
                    2025.01.22 오후 1:15:04
                </div>
                <button className="cancel-button" onClick={handleRemoveClick}>
                    예약취소
                </button>
            </div>
        </div>
    )
}
 
export default Reservation

