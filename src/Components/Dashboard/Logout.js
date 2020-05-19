import React from "react";
import logout from "../../Icons/logout.svg";
import { Button } from "react-bootstrap";

function Logout(props) {
  const handleClick = () => {
    localStorage.setItem("authorized", false);
    props.authorize(JSON.parse(localStorage.getItem("authorized")));
  };
  return (
    <div className="logout-container">
      <Button onClick={() => handleClick()}>Logout</Button>
    </div>
  );
}

export default Logout;
