import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
function DashboardIcons(props) {
  return (
    <>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="button-tooltip">{props.name}</Tooltip>}
      >
        <li>{props.icon}</li>
      </OverlayTrigger>
    </>
  );
}

export default DashboardIcons;
