import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import FilterSettings from "./FilterSettings";
import ProfileInformation from "./ProfileInformation";
function Settings() {
  return (
    <div className="settings-container">
      <div className="settings">
        <div className="settings-form">
          <ProfileInformation />
          <AccountSettings />
          <FilterSettings />
        </div>
      </div>
    </div>
  );
}

export default Settings;
