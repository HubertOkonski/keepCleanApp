import React, { useState, useEffect } from "react";
import Day from "./Day";
import MonthNames from "./MonthNames";

function Calendar(props) {
  const { year, monthNumber, firstDayNumber } = props.date;
  const [menuReset, setMenuReset] = useState(true);
  const getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
  };
  const addDays = (numOfDays, monthNumber) => {
    const todayNumber = new Date().getDate();
    const actualMonthNumber = new Date().getMonth();
    let todayStatus = false;
    var daysArray = [];
    for (let i = 1; i <= numOfDays; i++) {
      if (todayNumber === i && actualMonthNumber + 1 === monthNumber)
        todayStatus = true;
      else todayStatus = false;
      const day = {
        dayNumber: i,
        task: " ",
        status: "",
        done: "",
        today: todayStatus,
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
        days: addDays(numOfDays, i),
      };
      monthsArray.push(month);
    }
    return monthsArray;
  };

  const [CalendarData, setCalendarData] = useState(fillDataArray());
  const fillCalendarWithData = (dataArray) => {
    console.log(CalendarData);
    const copyOfCalendarData = [...CalendarData];
    dataArray.dates.forEach((task) => {
      copyOfCalendarData[task.month - 1].days[task.day - 1] = {
        dayNumber: task.day,
        done: task.done,
        status: task.status,
        task: task.name,
      };
    });
    setCalendarData(copyOfCalendarData);
    console.log(CalendarData);
  };
  const failUserFetch = () => {
    console.log("fetch failed");
  };
  useEffect(() => {
    fetch("http://us-central1-keepclean-f285d.cloudfunctions.net/days")
      .then((res) => res.json())
      .then(
        (result) => fillCalendarWithData(result),
        (result) => failUserFetch()
      );
  }, [0]);
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
          <Day
            dayNumber={day.dayNumber}
            status={day.status}
            done={day.done}
            task={day.task}
            today={day.today}
            menuReset={menuReset}
            setMenuReset={setMenuReset}
          />
        ))}
      </div>
    </>
  );
}
export default Calendar;
