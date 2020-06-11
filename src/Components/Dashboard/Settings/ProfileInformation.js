import React, { useState } from "react";
import FireBaseAuth from "./../../LoginPanel/FireBaseAuth";
import * as firebase from "firebase/app";
import { ReactComponent as User } from "./../../../Icons/user.svg";
function ProfileInformation() {
  console.log(User);
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
    <div className="profile-information-container">
      <div className="avatar-container">
        {user.photoURL !== "" ? (
          <img src={user.photoURL} alt="" srcset="" />
        ) : (
          <User />
        )}
      </div>
      <div className="profile-information">
        <p>
          <strong>{user.displayName}</strong>
        </p>
        <p>{user.email}</p>
      </div>
    </div>
  );
}

export default ProfileInformation;
