import React, { useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function Day(props) {
  const [show, setDisplay] = useState(false);
function toggleInfoDisplay(){
return !show
}
const hoverMouseHandler = () => {
setDisplay(toggleInfoDisplay);
}
const menuHandler = () =>{
console.log("menu")
}
  const { day, index } = props;
  return (
    <div className="day-container">
      <div className="day-bg-container">
        <div className="day-bg">  
        <div className="info-trigger"
      onMouseEnter={hoverMouseHandler}
      onMouseLeave={hoverMouseHandler} 
      >
        {show?<div className="info-message" ></div>:null}
          
      </div>
          <p className="day-number">
            <strong>{props.dayNumber}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Day;
