import React, { useState } from "react";
import DashboardContent from "./Dashboard-content";
import DashboardMenu from "./Dashboard-menu";
import HamburgerMenu from "react-hamburger-menu";
import Help from "./Help";
function Dashboard(props) {
  const [section, setSection] = useState("Calendar");
  const [helpView, setHelpView] = useState(false);
  const [menuStatus, setMenuStatus] = useState(false);
  const handleMenuClick = () => {
    setMenuStatus(!menuStatus);
  };
  const handleLogoutClick = () => {
    localStorage.setItem("authorized", false);
    props.authorize(JSON.parse(localStorage.getItem("authorized")));
  };
  const handleHelpClick = () => {
    setHelpView(true);
  };
  const handleCalendarClick = () => {
    if (section !== "Calendar") setSection("Calendar");
    setMenuStatus(false);
  };
  const handleSettingsClick = () => {
    setSection("Settings");
    setMenuStatus(false);
  };
  return (
    <div
      className={
        JSON.parse(localStorage.getItem("authorized"))
          ? "Dashboard active-transition"
          : "Dashboard"
      }
      id="dash"
    >
      <div className="mobile-menu">
        <HamburgerMenu
          width={30}
          height={18}
          isOpen={menuStatus}
          menuClicked={() => handleMenuClick()}
          strokeWidth={0}
          rotate={0}
          color="#005efd"
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
      {menuStatus ? (
        <div className="menu-overlay">
          <ul>
            <li onClick={handleCalendarClick}>Calendar</li>
            <li onClick={handleSettingsClick}>Settings</li>
            <li onClick={handleHelpClick}>Help</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      ) : null}
      <div className="dashboard-content-container">
        <DashboardMenu
          authorize={props.authorize}
          setSection={setSection}
          setHelpView={setHelpView}
          handleCalendarClick={handleCalendarClick}
          handleHelpClick={handleHelpClick}
          handleLogoutClick={handleLogoutClick}
          handleSettingsClick={handleSettingsClick}
        />
        <DashboardContent section={section} />
        <Help helpView={helpView} setHelpView={setHelpView} />
      </div>
    </div>
  );
}

export default Dashboard;
