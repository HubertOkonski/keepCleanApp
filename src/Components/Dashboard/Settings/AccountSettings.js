import React, { useState } from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Spinner,
  Button,
} from "react-bootstrap";
function AccountSettings() {
  const [email, setEmail] = useState({
    email: "",
    repeatedEmail: "",
  });

  const handleEmailChange = (e, property) => {
    let text = e.target.value;
    setEmail((prevState) => ({
      ...prevState,
      [property]: text,
    }));
  };

  const sendChangeRequest = () => {};
  const showRejectInformation = () => {};

  const validitionCheck = () => {
    if (email.email == email.repeatedEmail) sendChangeRequest();
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
            <Button variant="primary" type="submit" onClick={validitionCheck}>
              Change
            </Button>{" "}
          </Form.Group>
        </Form>
        <Form className="form-settings">
          <Form.Group controlId="formBasicEmail" className="password-change ">
            <Form.Label>Change your password</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter new password"
              value={email.email}
              onChange={(e) => handleEmailChange(e, "email")}
            />
            <Form.Control
              type="email"
              placeholder="Re-enter new password"
              value={email.repeatedEmail}
              onChange={(e) => handleEmailChange(e, "repeatedEmail")}
            />
            <Button variant="primary" type="submit" onClick={validitionCheck}>
              Change
            </Button>{" "}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default AccountSettings;
