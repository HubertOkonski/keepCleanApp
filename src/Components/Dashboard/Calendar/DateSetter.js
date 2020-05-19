import React from "react";
import arrow from "../../../Icons/arrow.svg";
import MonthNames from "./MonthNames";
import { Button } from "react-bootstrap";
import Arrow from "./../../../Icons/arrow.svg";
function DateSetter(props) {
  const handleClick = (number) => {
    var obj = Object.assign({}, props.date);
    obj.monthNumber = obj.monthNumber + number;
    obj.monthName = MonthNames[obj.monthNumber];
    obj.firstDayNumber = new Date(obj.year, obj.monthNumber, 1).getDay();
    obj.firstDayNumber = props.normalize(obj.firstDayNumber);
    props.setDate(obj);
  };
  const buttonDisabled = () => {
    if(props.date.monthNumber==0 || props.date.monthNumber==11)
    return true
  }
  return (
    <div className="dateSetter-container">
      <h4>
        <div className="btn-container">
          <Button className="backward" onClick={()=>handleClick(-1)} disabled={props.date.monthNumber==0?buttonDisabled():null}>
            <img src={Arrow} alt="" className="arrow-button-img" / >
          </Button>
          <Button className="forward" onClick={()=> handleClick(1)} disabled={props.date.monthNumber==11?buttonDisabled():null}>
            <img src={Arrow} alt="" className="arrow-button-img reverted" />
          </Button>
          <span>month</span>
        </div>
  <span>{props.date.monthName}</span>
        <span>2020</span>
      </h4>
    </div>
  );
}

export default DateSetter;
