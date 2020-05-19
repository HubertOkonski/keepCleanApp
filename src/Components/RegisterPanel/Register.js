import React, { useState } from "react";
import ScrollIntoView from "react-scroll-into-view";
import * as firebase from "firebase/app";
import { Form, FormGroup, Button } from "react-bootstrap";
function Register() {
  const defaultRegisterForm = () => {
    const Form = { email: "", password: "", passwordConfirmation: "" };
    return Form;
  };
  const [registerNotification, setRegisterNotification] = useState("");
  const [registerForm, setRegisterForm] = useState(defaultRegisterForm());

  const messageColorChange = (value) => {
    let message = document.getElementsByClassName("message");
    if (value) {
      message[0].style.color = "#45b345";
      return true;
    } else {
      message[0].style.color = "#f53232";
      return false;
    }
  };
  const successCallback = () => {
    messageColorChange(true);
    setRegisterForm(defaultRegisterForm());
    console.log("success");
    setRegisterNotification("Udało się utworzyć konto");
  };
  const failureCallback = () => {
    console.log("failed");
    messageColorChange(false);
    setRegisterNotification(
      "Podany e-mail już istnieje lub wystąpił inny nieznany błąd"
    );
  };
  const handleChange = (email, password, passwordConfirmation) => {
    setRegisterForm({
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    });
  };
  const passwordConfirmationCheck = () => {
    if (
      messageColorChange(
        registerForm.password == registerForm.passwordConfirmation
      )
    )
      return true;
    else {
      setRegisterNotification("Hasła są różne");
      return false;
    }
  };
  const passwordCheck = () => {
    var re = /(?=.{8,})/;
    if (messageColorChange(re.test(registerForm.password))) {
      setRegisterNotification("");
      return true;
    } else {
      setRegisterNotification(
        "Nieprawidłowe hasło - powinno zawierać 8 znaków"
      );
      return false;
    }
  };
  const emailCheck = () => {
    var re = /\S+@\S+\.\S+/;
    if (messageColorChange(re.test(registerForm.email))) {
      setRegisterNotification("");
      return true;
    } else {
      setRegisterNotification("Nieprawidłowy adres e-mail");
      return false;
    }
  };
  const formCheck = (e) => {
    e.preventDefault();
    if (emailCheck() && passwordCheck() && passwordConfirmationCheck()) {
      formSend(e);
    } else {
    }
  };
  const formSend = (e) => {
    let email = registerForm.email;
    let password = registerForm.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(successCallback, failureCallback);
  };
  return (
    <div className="register-panel-container" id="register-panel-container">
      <div className="register-panel">
        <p>
          <ScrollIntoView
            selector="#login-container"
            className="login-redirect-scroll"
          >
            <span className="register-redirect">back to login</span>
          </ScrollIntoView>
        </p>

        <Form.Label>
          <h3>Register Panel</h3>
        </Form.Label>
        <div className="register-form">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={registerForm.email}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    registerForm.password,
                    registerForm.passwordConfirmation
                  )
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                value={registerForm.password}
                onChange={(e) =>
                  handleChange(
                    registerForm.email,
                    e.target.value,
                    registerForm.passwordConfirmation
                  )
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder="Confirm password"
                required
                value={registerForm.passwordConfirmation}
                onChange={(e) =>
                  handleChange(
                    registerForm.email,
                    registerForm.password,
                    e.target.value
                  )
                }
              />
            </Form.Group>
            <FormGroup className="buttons-container">
              <Button
                variant="primary"
                type="sumbit"
                className="button"
                onClick={(e) => formCheck(e)}
              >
                Register
              </Button>
              <div className="message-container">
                <p>
                  <span className="message">{registerNotification}</span>{" "}
                </p>
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
