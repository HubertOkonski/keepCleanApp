import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
function AccountSettings(props) {
  const { user } = props;
  const [email, setEmail] = useState({
    email: "",
    repeatedEmail: "",
  });
  const [password, setPassword] = useState({
    password: "",
    repeatedPassword: "",
  });

  const handleEmailChange = (e, property) => {
    let text = e.target.value;
    setEmail((prevState) => ({
      ...prevState,
      [property]: text,
    }));
  };
  const handlePasswordChange = (e, property) => {
    let text = e.target.value;
    setPassword((prevState) => ({
      ...prevState,
      [property]: text,
    }));
  };
  const sendChangeRequest = (type) => {
    if (type === "email")
      user
        .updateEmail(email.repeatedEmail)
        .then(function () {
          console.log("email changed");
        })
        .catch(function (error) {
          // An error happened.
        });
    else
      user
        .updatePassword(password.repeatedPassword)
        .then(function () {
          console.log("passsword changed");
        })
        .catch(function (error) {
          // An error happened.
        });
  };
  const showRejectInformation = () => {};

  const validitionCheck = (input, repeatedInput, type) => {
    if (input === repeatedInput) sendChangeRequest(type);
    else showRejectInformation();
  };

  return (
    <>
      <div className="account-settings">
        <h4>Account settings</h4>
        <Form className="form-settings">
          <Form.Group controlId="formBasicEmail" className="email-change ">
            <Form.Label>Change your email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter new email"
              value={email.email}
              onChange={(e) => handleEmailChange(e, "email")}
            />
            <Form.Control
              type="email"
              placeholder="Re-enter new address email"
              value={email.repeatedEmail}
              onChange={(e) => handleEmailChange(e, "repeatedEmail")}
            />
            <Button
              variant="primary"
              type="submit"
              onClick={() =>
                validitionCheck(email.email, email.repeatedEmail, "email")
              }
            >
              Change
            </Button>{" "}
          </Form.Group>
        </Form>
        <Form className="form-settings">
          <Form.Group controlId="formBasicEmail" className="password-change ">
            <Form.Label>Change your password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password.password}
              onChange={(e) => handlePasswordChange(e, "password")}
            />
            <Form.Control
              type="password"
              placeholder="Re-enter new password"
              value={password.repeatedPassword}
              onChange={(e) => handlePasswordChange(e, "repeatedPassword")}
            />
            <Button
              variant="primary"
              type="submit"
              onClick={() =>
                validitionCheck(
                  password.password,
                  password.repeatedPassword,
                  "password"
                )
              }
            >
              Change
            </Button>{" "}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default AccountSettings;
