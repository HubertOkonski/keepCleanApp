import React, { useState } from "react";
import "../Styles/App.css";
import Dashboard from "./Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Background from "./LoginPanel/Background";
import Home from "./Home/Home";
import LoginLogo from "./LoginPanel/LoginLogo";
function App() {
  const [authenticated, authorize] = useState(
    JSON.parse(localStorage.getItem("authorized"))
  );
  return (
    <>
      <div className="App ">
        <Background authenticated={authenticated} />
        {authenticated ? (
          <Dashboard authorize={authorize} />
        ) : (
          <>
            <LoginLogo />
            <Home authorize={authorize} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
