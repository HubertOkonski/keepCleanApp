import React, { useState, useEffect } from "react";
import Day from "./Day";
import MonthNames from "./MonthNames";
import { Button } from "react-bootstrap";
function Calendar(props) {
  const { filters, setFilters } = props;
  const { year, monthNumber, firstDayNumber } = props.date;
  const [taskInfo, setTaskInfo] = useState({
    name: "",
    task: "",
    dayNumber: "",
    monthNumber: "",
  });
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
        timestamp: new Date(props.date.year, monthNumber - 1, i).getTime(),
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

  const filterObj = {
    showAllDays: function (day) {
      return true;
    },
    showOnlyMine: function (day) {
      if (day.name === "Hubert Okoński") return true;
      else return false;
    },
    showEveryoneExceptMe: function (day) {
      if (day.name !== "Hubert Okoński") return true;
      else return false;
    },
    showOnlyCleaned: function (day) {
      if (day.done) return true;
      else return false;
    },
    showOnlyNotCleaned: function (day) {
      if (!day.done) return true;
      else return false;
    },
  };

  const filterChooser = (filterNumber, secondFilterNumber) => {
    let arrayOfPersonFilters = [];
    Object.entries(filters).forEach((value, index) => {
      if (
        value[1] === true &&
        (index == filterNumber || index == secondFilterNumber)
      )
        arrayOfPersonFilters.push(value[0]);
    });
    return arrayOfPersonFilters;
  };

  const personFilter = (arrayOfPersonFilters, day) => {
    let status = false;
    arrayOfPersonFilters.forEach((filter) => {
      if (!status) status = filterObj[filter](day);
    });
    if (status == true) return day;
    else return null;
  };
  const dayCleanlinessFilter = (arrayOfDaysFilters, day) => {
    let status = false;
    arrayOfDaysFilters.forEach((filter) => {
      if (!status) status = filterObj[filter](day);
    });
    if (status == true) return day;
    else return null;
  };
  const filterDays = (day) => {
    if (!filters.showAllDays) {
      let arrayOfPersonFilters = [...filterChooser(1, 2)];
      let arrayOfDaysFilters = [...filterChooser(3, 4)];
      day = personFilter(arrayOfPersonFilters, day);
      if (day != null) day = dayCleanlinessFilter(arrayOfDaysFilters, day);
    }
    return day;
  };

  const [CalendarData, setCalendarData] = useState(fillDataArray());

  const fillCalendarWithData = (dataArray) => {
    const copyOfCalendarData = [...CalendarData];
    let filtredDataArray = dataArray.dates.filter(filterDays);
    console.log(filtredDataArray);
    filtredDataArray.forEach((task) => {
      copyOfCalendarData[task.month - 1].days[task.day - 1] = {
        dayNumber: task.day,
        done: task.done,
        status: task.status,
        task: task.name,
        today: copyOfCalendarData[task.month - 1].days[task.day - 1].today,
        timestamp:
          copyOfCalendarData[task.month - 1].days[task.day - 1].timestamp,
      };
    });
    setCalendarData(copyOfCalendarData);
  };
  const failUserFetch = () => {
    console.log("fetch failed");
  };
  useEffect(() => {
    fetch("https://us-central1-keepclean-f285d.cloudfunctions.net/days")
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
    <div className="calendar-container">
      <div className="calendar">
        {updateView().map((day) => (
          <Day
            dayNumber={day.dayNumber}
            status={day.status}
            done={day.done}
            task={day.task}
            today={day.today}
            timestamp={day.timestamp}
            menuReset={menuReset}
            setMenuReset={setMenuReset}
            setTaskInfo={setTaskInfo}
            taskInfo={taskInfo}
          />
        ))}
      </div>
      <div className="task-info-viewer-container">
        {taskInfo.name !== "" ? (
          <div className="task-info-viewer">
            <div className="task-info">
              <center>
                <p>Who: {taskInfo.name}</p>
                <p>
                  Status:
                  {taskInfo.status ? (
                    <span
                      style={{
                        color: "green",
                      }}
                    >
                      {" "}
                      Done{" "}
                    </span>
                  ) : (
                    <span style={{ color: "red" }}> Not Done </span>
                  )}{" "}
                </p>
              </center>
            </div>

            <div className="task-info-buttons">
              <Button variant="primary" disabled={!taskInfo.editAvailability}>
                Cancel
              </Button>
              <Button variant="primary" disabled={!taskInfo.editAvailability}>
                Postpone
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default Calendar;
