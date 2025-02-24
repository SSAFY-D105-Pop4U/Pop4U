import React, { useState } from "react";
import '../../styles/components/ColorPicker.css'

const ColorPicker = ({selectedColor, setSelectedColor}) =>{
    const colors = [
        "#FFFFFF", "#C49A6C", "#E8919F", "#6E86AC", "#E6A28B", "#65997A", "#3F4463"
      ];
      
    
    return(
        <div>
            <div className="color-picker">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-circle ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
        </div>
    )
}
//4:55 수정함함
export default ColorPicker

