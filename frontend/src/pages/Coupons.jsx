import Header from "../components/basic/Header"
import Swipe from "../components/reservation/Swipe"
import '../styles/pages/Reservation.css'
const Coupons = () => {
    return (
        <div>
            <Header title={"쿠폰함"}/>
            <div className="card-container">
                <Swipe type={"쿠폰"} />
                <div className="update-time">
                    2025.01.22 오후 1:15:04
                </div>
                
            </div>
        </div>
    )
}
 
export default Coupons

