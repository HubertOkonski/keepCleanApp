import React from "react";
import { ReactComponent as CalendarIcon } from "./../../Icons/calendar.svg";
import { ReactComponent as HelpIcon } from "./../../Icons/help.svg";
import { ReactComponent as SettingsIcon } from "./../../Icons/settings.svg";
import { ReactComponent as LogoutIcon } from "./../../Icons/logout.svg";
import DashboardIcons from "./Dashboard-icons";
function DashboardMenu(props) {
  const {
    handleHelpClick,
    handleLogoutClick,
    handleCalendarClick,
    handleSettingsClick,
  } = props;

  return (
    <div className="DashboardMenu">
      <div className="menu-container">
        <nav className="menu-navigation">
          <div onClick={handleCalendarClick}>
            <DashboardIcons
              name={"Calendar"}
              icon={<CalendarIcon className="dashboard-menu-icons" />}
            />
          </div>
          <div onClick={handleSettingsClick}>
            <DashboardIcons
              name={"Settings"}
              icon={<SettingsIcon className="dashboard-menu-icons" />}
            />
          </div>
          <div onClick={handleHelpClick}>
            <DashboardIcons
              name={"Help"}
              icon={<HelpIcon className="dashboard-menu-icons" />}
            />
          </div>
          <div onClick={handleLogoutClick}>
            <DashboardIcons
              name={"Logout"}
              icon={<LogoutIcon className="dashboard-menu-icons" />}
            />
          </div>
          <p></p>
        </nav>
      </div>

      <div className="notifications"></div>
    </div>
  );
}

export default DashboardMenu;
