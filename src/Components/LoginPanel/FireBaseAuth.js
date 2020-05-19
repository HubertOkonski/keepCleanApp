import React, { useState, useEffect } from "react";
import FireBaseConfig from "./FireBaseConfig";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
function FireBaseAuth(props) {
  try {
    firebase.initializeApp(FireBaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }
  var uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => changeLogInStatus(),
    },
  };
  const changeLogInStatus = () => {
    localStorage.setItem("authorized", true);
    props.authorize(JSON.parse(localStorage.getItem("authorized")));
  };

  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}

export default FireBaseAuth;
