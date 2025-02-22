import React, { useState } from "react";
import "../../styles/components/ShotToggleButton.css"; // CSS 파일 가져오기

const ShotToggleButton = ({active, setActive}) =>{
    
    return(
        <div>
<div className="toggle-container">
      <div className="toggle-background" style={{ transform: `translateX(${active === "사진" ? "0%" : active === "테마" ? "100%" : "200%"})` }} />
      <button className={`toggle-btn ${active === "사진" ? "active" : ""}`} onClick={() => setActive("사진")}>
        사진
      </button>
      <button className={`toggle-btn ${active === "테마" ? "active" : ""}`} onClick={() => setActive("테마")}>
        테마
      </button>
      <button className={`toggle-btn ${active === "캐릭터" ? "active" : ""}`} onClick={() => setActive("캐릭터")}>
        캐릭터
      </button>
    </div>
        </div>
    )
}
//4:55 수정함함
export default ShotToggleButton

