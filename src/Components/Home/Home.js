import React from "react";
import LoginPanel from "../LoginPanel/LoginPanel";
import RegisterPanel from "./../RegisterPanel/Register";
import { ReactComponent as Linkedin } from "./../../Icons/linkedin.svg";
import { ReactComponent as Facebook } from "./../../Icons/facebook.svg";
import { ReactComponent as Github } from "./../../Icons/github.svg";
function Home(props) {
  const { authorize, fillUserData } = props;
  return (
    <div className="home-container container">
      <div className="logo"></div>
      <div className="home-package">
        <div className="home">
          <h2>Welcome</h2>
          <div className="home-content-container">
            <p>
              {" "}
              To the app, that was designed to help me and my friends to keep
              our house clean. Idea was inspired by the lack of apps in that
              area and misfit calendar in google-calendar.
            </p>
            <p>
              {" "}
              App is restricted for users that aren't our flatmates but, they
              are allowed to have insight to the calendar. All code that's
              running the app was placed in github page in the link below. In
              case of any suggestion or errors, I would be greatful if You
              contact me: <strong>hubertokonski1@gmail.com</strong>
            </p>
            <p>
              {" "}
              <i>Hubert Okoński</i>
            </p>
          </div>
          <footer className="socials-container">
            <p>Find me on</p>
            <ul className="socials">
              <li>
                {" "}
                <a href="https://www.linkedin.com/in/hubert-oko%C5%84ski-644845182/">
                  <Linkedin />
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="https://www.facebook.com/okonskihubert">
                  <Facebook />
                </a>{" "}
              </li>
              <li>
                {" "}
                <a href="https://github.com/HubertOkonski">
                  <Github />
                </a>{" "}
              </li>
            </ul>
          </footer>
        </div>
        <div className="scroll-container">
          <LoginPanel authorize={authorize} fillUserData={fillUserData} />
          <RegisterPanel />
        </div>
      </div>
    </div>
  );
}

export default Home;
