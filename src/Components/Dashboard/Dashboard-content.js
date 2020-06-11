import React, { useState, useEffect } from "react";
import Calendar from "./Calendar/Calendar";
import DateSetter from "./Calendar/DateSetter";
import MonthNames from "./Calendar/MonthNames";
import CalendarHeader from "./Calendar/CalendarHeader";
import Settings from "./Settings/Settings";
function DashboardContent(props) {
  const firstDayNumberNormalizer = (number) => {
    number == 0 ? (number = 7) : (number = number);
    return number;
  };
  const defaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    let firstDayNumber = new Date(year, month, 1).getDay();
    const date = {
      year: year,
      monthNumber: month,
      monthName: MonthNames[month],
      firstDayNumber: firstDayNumberNormalizer(firstDayNumber),
    };
    return date;
  };
  const [date, setDate] = useState(defaultDate);
  return (
    <>
      {props.section === "Calendar" ? (
        <div className="dashboard-rightside">
          <div className="logo-container">Keep It Clean</div>
          <h1 className="choosed-section">{props.section}</h1>
          <div className="calendarPanel-container">
            <DateSetter
              setDate={setDate}
              date={date}
              normalize={firstDayNumberNormalizer}
            />
            <CalendarHeader />
            <Calendar date={date} />
          </div>
        </div>
      ) : (
        <div className="dashboard-rightside">
          <div className="logo-container">Keep It Clean</div>
          <h1 className="choosed-section">{props.section}</h1>
          <Settings />
        </div>
      )}
    </>
  );
}

export default DashboardContent;
