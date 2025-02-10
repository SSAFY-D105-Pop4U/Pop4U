import Header from "../components/public/Header"
import Swipe from "../components/reservation/Swipe"
const Reservation = () => {
    return (
        <div>
            <Header title={"내 예약"}/>
            <div className="card-container">
            <Swipe/>
    </div>
        </div>
    )

}
 
export default Reservation

