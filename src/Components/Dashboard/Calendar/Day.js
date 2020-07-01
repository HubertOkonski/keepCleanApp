import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { isMobile } from "react-device-detect";
function Day(props) {
  const getMonth = () => {
    var date = new Date(props.timestamp);
    return date.getMonth() + 1;
  };
  const {
    getMinDate,
    sendPostponeRequest,
    handleDateChange,
    sendCancelRequest,
    postponeMenuStatus,
    closePostponeMenu,
    showPostponeMenu,
  } = props;
  const [menuSettings, setMenuSettings] = useState({
    visibility: "hidden",
    x: 0,
    y: 0,
  });
  const editAvailability = () => {
    const todayTimestamp = Date.now();
    return props.timestamp > todayTimestamp;
  };
  const menuHandler = (e) => {
    if (isMobile)
      props.setTaskInfo({
        name: props.task,
        done: props.done,
        monthNumber: getMonth(),
        dayNumber: props.dayNumber,
        editAvailability: editAvailability(),
      });
    if (e.nativeEvent.which === 3) {
      e.preventDefault();
      props.setMenuReset(!props.menuReset);
      setMenuSettings({
        visibility: "visible",
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  return (
    <div className="day-container">
      {props.task !== " " ? (
        <div
          className="postpone-container"
          style={postponeMenuStatus ? { visibility: "visible" } : {}}
        >
          <span className="close" onClick={closePostponeMenu}></span>
          <div className="postpone">
            <p>Choose a new cleaning day</p>
            <input
              type="date"
              step="1"
              min={getMinDate()}
              max="2020-08-31"
              onChange={(e) => handleDateChange(e)}
            ></input>
            <button onClick={sendPostponeRequest}>Confirm</button>
          </div>
        </div>
      ) : null}

      <div className="day-bg-container">
        <div
          className="day-bg"
          style={
            props.status
              ? {
                  backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 255, 255, 0), rgba(188, 192, 228, 0.35), rgba(155, 153, 179, 0.23) ${
                    isMobile ? "33.33%" : "12.5%"
                  })`,
                }
              : {}
          }
        >
          {menuSettings ? (
            <div
              className="menu"
              style={{
                top: menuSettings.y,
                left: menuSettings.x,
                visibility: menuSettings.visibility,
              }}
            >
              <ul>
                <li>
                  <button
                    disabled={!editAvailability()}
                    onClick={sendCancelRequest}
                    style={
                      !editAvailability()
                        ? { color: "lightgrey", cursor: "default" }
                        : {}
                    }
                  >
                    Cancel
                  </button>
                </li>
                <li>
                  <button
                    style={
                      !editAvailability()
                        ? { color: "lightgrey", cursor: "default" }
                        : {}
                    }
                    disabled={!editAvailability()}
                    onClick={showPostponeMenu}
                  >
                    Postpone
                  </button>
                </li>
                <li>
                  <button
                    style={
                      !editAvailability()
                        ? { color: "lightgrey", cursor: "default" }
                        : {}
                    }
                    disabled={!editAvailability()}
                  >
                    Cleaned{" "}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          {props.status ? (
            <OutsideClickHandler
              onOutsideClick={() => {
                setMenuSettings({
                  visibility: "hidden",
                });
              }}
            >
              <div
                className="info-trigger"
                onClick={(e) => menuHandler(e)}
                onContextMenu={(e) => menuHandler(e)}
                style={
                  props.taskInfo.dayNumber === props.dayNumber && isMobile
                    ? {
                        border: "1px solid #cccccc",
                      }
                    : {}
                }
              ></div>
            </OutsideClickHandler>
          ) : (
            ""
          )}

          <div className="day-info">
            <p>
              <strong
                style={
                  props.today
                    ? {
                        border: "2px solid #d2d2d2",
                        padding: "0.28rem 0.51rem",
                        borderRadius: "50%",
                      }
                    : {}
                }
              >
                {props.dayNumber}
              </strong>
            </p>
            <div
              className="desktop-name-viewer"
              style={props.done ? { color: "#5bc368" } : { color: "#ff5959" }}
            >
              {props.task}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Day;
