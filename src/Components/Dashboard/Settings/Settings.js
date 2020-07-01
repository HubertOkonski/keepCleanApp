import React, { useState } from "react";
import AccountSettings from "./AccountSettings";
import FireBaseAuth from "./../../LoginPanel/FireBaseAuth";
import * as firebase from "firebase/app";
import FilterSettings from "./FilterSettings";
import ProfileInformation from "./ProfileInformation";
function Settings(props) {
  const { filters, setFilters } = props;
  const [user, setUser] = useState({});
  FireBaseAuth();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
    }
  });
  return (
    <div className="settings-container">
      <div className="settings">
        <div className="settings-form">
          {Object.keys(user).length === 0 ? (
            <div className="lds-dual-ring"></div>
          ) : (
            <>
              <ProfileInformation setUser={setUser} user={user} />
              <AccountSettings setUser={setUser} user={user} />
              <FilterSettings
                filters={filters}
                setFilters={setFilters}
                user={user}
              />{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
