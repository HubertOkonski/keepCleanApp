import React, { useState } from "react";
import { Form, FormGroup, Button, Spinner } from "react-bootstrap";
import "firebase/auth";
import ScrollIntoView from "react-scroll-into-view";
import * as firebase from "firebase/app";
import FireBaseAuth from "./FireBaseAuth";
function LoginPanel(props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loginInfo, setloginInfo] = useState("");
  const successCallback = () => {
    console.log("success");
    setTimeout(() => {
      localStorage.setItem("authorized", true);
      props.authorize(JSON.parse(localStorage.getItem("authorized")));
    }, 1000);
  };
  const failureCallback = () => {
    setTimeout(() => {
      setLoadingStatus(false);
      setloginInfo("Incorrect email or password.");
    }, 750);
    console.log("failed");
  };
  const handleChange = (email, password) => {
    setLoginForm({
      email: email,
      password: password,
    });
  };
  const loginFormEmailCheck = () => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(loginForm.email)) {
      setloginInfo("");
      return true;
    } else {
      setloginInfo("The specified email is invalid.");
      return false;
    }
  };
  const loginFormPasswordCheck = () => {
    var re = /(?=.{8,})/;
    if (re.test(loginForm.password)) {
      setloginInfo("");
      return true;
    } else {
      setloginInfo("Invalid password.");
      return false;
    }
  };
  const loginFormSend = (e) => {
    e.preventDefault();
    if (loginFormEmailCheck() && loginFormPasswordCheck()) {
      setLoadingStatus(!loadingStatus);
      let email = loginForm.email;
      let password = loginForm.password;
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then(successCallback, failureCallback)
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="login-container" id="login-container">
      <div className="login-form">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <h3>Login Panel</h3>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(e) => handleChange(e.target.value, loginForm.password)}
              value={loginForm.email}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => handleChange(loginForm.email, e.target.value)}
              value={loginForm.password}
              required
            />
          </Form.Group>
          <p>
            <center>
              <span className="login-notifications">{loginInfo}</span>
            </center>
          </p>
          <FormGroup className="buttons-container">
            <Button
              variant="primary"
              type="sumbit"
              className="button"
              onClick={(e) => loginFormSend(e)}
            >
              {loadingStatus ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <span>
              {" "}
              <center>or</center>{" "}
            </span>
            <FireBaseAuth authorize={props.authorize} />
          </FormGroup>
        </Form>
        <footer>
          <p>
            If you don't have an account yet click{" "}
            <ScrollIntoView
              selector="#register-panel-container"
              className="register-redirect-scroll"
            >
              <span className="register-redirect">here</span>
            </ScrollIntoView>{" "}
            to register
          </p>
        </footer>
      </div>
    </div>
  );
}

export default LoginPanel;
