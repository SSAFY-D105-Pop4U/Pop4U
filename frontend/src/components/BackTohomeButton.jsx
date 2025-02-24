import backbutton from "../assets/icons/backbutton.png"
import { useNavigate } from "react-router-dom"

const BackToHomeButton = () =>{
    const nav = useNavigate()
    const handelback = () =>{
        nav("/")
    }
    return(
        <img src={backbutton} onClick = {handelback} alt="back" className = "back" 
        style={{ width: "25px", height: "25px", cursor: "pointer", marginTop:"5px",marginLeft:"5px", marginBottom:"5px"}}   />
    )
}
//4:55 수정함함
export default BackToHomeButton

