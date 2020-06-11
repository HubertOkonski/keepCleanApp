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
      signInSuccess: (provider) => changeLogInStatus(provider),
    },
  };
  const changeLogInStatus = (provider) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithRedirect(provider);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
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
