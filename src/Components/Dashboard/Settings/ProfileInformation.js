import React from "react";
import { ReactComponent as User } from "./../../../Icons/user.svg";
function ProfileInformation(props) {
  const { user } = props;
  return (
    <div className="profile-information-container">
      <h4>Profile Information</h4>
      <div className="avatar-container">
        {user.photoURL !== null ? (
          <img src={user.photoURL} alt="" srcSet="" />
        ) : (
          <User />
        )}
      </div>
      <div className="profile-information">
        <p>
          <strong>{user.displayName}</strong>
        </p>
        <p>email: {user.email}</p>
      </div>
    </div>
  );
}

export default ProfileInformation;
