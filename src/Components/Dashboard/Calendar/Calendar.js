import React, { useState, useEffect } from "react";
import Day from "./Day";
import MonthNames from "./MonthNames";

function Calendar(props) {
  console.log("rendered");
  const { year, monthNumber, firstDayNumber } = props.date;
  const getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
  };
  useEffect(() => {
    fetch("http://localhost:5001/keepclean-f285d/us-central1/days")
      .then((res) => res.json())
      .then((result) => console.log(result));
  }, [0]);
  const addDays = (numOfDays) => {
    var daysArray = [];
    for (let i = 1; i <= numOfDays; i++) {
      const day = {
        dayNumber: i,
        task: " ",
        status: "",
        done: "",
      };
      daysArray.push(day);
    }
    return daysArray;
  };
  const fillDataArray = () => {
    const monthsArray = [];
    for (var i = 1; i <= 12; i++) {
      let numOfDays = getDaysInMonth(i, year);
      const month = {
        monthNumber: i,
        monthName: MonthNames[i - 1],
        days: addDays(numOfDays),
      };
      monthsArray.push(month);
    }
    return monthsArray;
  };
  const [CalendarData, setCalendarData] = useState(fillDataArray());
  const getDaysOfPrevMonth = () => {
    const array = [];
    const numOfDaysOfPrevMonth = getDaysInMonth(monthNumber, year);
    if (monthNumber != 0)
      for (let i = 0; i < firstDayNumber - 1; i++)
        array.push(
          CalendarData[monthNumber - 1].days[
            numOfDaysOfPrevMonth - (firstDayNumber - 1) + i
          ]
        );
    return array;
  };
  const getDaysOfActualMonth = () => {
    const array = [];
    const numOfDaysOfActualMonth = getDaysInMonth(monthNumber + 1, year);
    for (let i = 0; i < numOfDaysOfActualMonth; i++)
      array.push(CalendarData[monthNumber].days[i]);
    return array;
  };
  const getDaysOfNextMonth = () => {
    const array = [];
    const numOfDaysOfNextMonth =
      42 - (firstDayNumber - 1) - getDaysInMonth(monthNumber + 1, year);
    if (monthNumber != 11)
      for (let i = 0; i < numOfDaysOfNextMonth; i++)
        array.push(CalendarData[monthNumber + 1].days[i]);
    return array;
  };
  const updateView = () => {
    const calendarViewArray = [
      ...getDaysOfPrevMonth(),
      ...getDaysOfActualMonth(),
      ...getDaysOfNextMonth(),
    ];
    return calendarViewArray;
  };
  return (
    <>
      <div className="calendar-container">
        {updateView().map((day) => (
          <Day dayNumber={day.dayNumber} />
        ))}
      </div>
    </>
  );
}
export default Calendar;
