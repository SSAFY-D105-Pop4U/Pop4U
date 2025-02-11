import Header from "../components/basic/Header"
import Swipe from "../components/reservation/Swipe"
import '../styles/pages/Reservation.css'
const Reservation = () => {
    return (
        <div>
            <Header title={"내 예약"}/>
            <div className="card-container">
                <Swipe/>
                <div className="update-time">
                    2025.01.22 오후 1:15:04
                </div>
                <button className="cancel-button">
                    예약취소
                </button>
            </div>
        </div>
    )
}
 
export default Reservation

