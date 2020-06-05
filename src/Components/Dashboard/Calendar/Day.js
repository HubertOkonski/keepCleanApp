import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { isMobile } from "react-device-detect";
function Day(props) {
  const [show, setDisplay] = useState(false);
  const [menuSettings, setMenuSettings] = useState({
    visibility: "hidden",
    x: 0,
    y: 0,
  });
  function toggleInfoDisplay() {
    return !show;
  }
  const hoverMouseHandler = () => {
    setDisplay(toggleInfoDisplay);
  };
  const menuHandler = (e) => {
    if (isMobile) props.setTaskInfo(`Kto: ${props.task}`);
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
  const { day, index } = props;
  return (
    <div className="day-container">
      <div className="day-bg-container">
        <div
          className="day-bg"
          style={
            props.status
              ? {
                  background:
                    "repeating-linear-gradient(45deg, rgba(227, 230, 245,0.62), transparent 10%)",
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
                <li>Cancel</li>
                <li>Postpone</li>
                <li>Informacje</li>
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
            <div className="desktop-name-viewer">{props.task}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Day;
