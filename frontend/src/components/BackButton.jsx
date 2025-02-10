import backbutton from "../assets/icons/backbutton.png"
import { useNavigate } from "react-router-dom"

const BackButton = () =>{
    const nav = useNavigate()
    const handelback = () =>{
        nav(-1)
    }
    return(
        <img src={backbutton} onClick = {handelback} alt="back" className = "back" 
        style={{ width: "25px", height: "25px", cursor: "pointer", marginTop:"5px",marginLeft:"5px", marginBottom:"5px"}}   />
    )
}

export default BackButton

