import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";
function Day(props) {
  const [postponeMenuStatus, setPostponeMenuStatus] = useState(false);
  const closePostponeMenu = () => {
    setPostponeMenuStatus(false);
  };
  const showPostponeMenu = () => {
    setPostponeMenuStatus(true);
  };
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
          <span class="close" onClick={closePostponeMenu}></span>
          <div className="postpone">
            <h2>Postpone Menu</h2>
            <p>Choose a new cleaning day</p>
            <input type="date" step="1" min="00:00:00" max="31.12.2020"></input>
            <button>Confirm</button>
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
