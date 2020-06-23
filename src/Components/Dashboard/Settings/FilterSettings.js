import React, { useState } from "react";
import {
  Form,
  FormControl,
  InputGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as firebase from "firebase/app";
import FireBaseAuth from "./../../LoginPanel/FireBaseAuth";
function FilterSettings(props) {
  FireBaseAuth();
  const [filterSettings, setfilterSettings] = useState(
    JSON.parse(localStorage.getItem("filters"))
  );
  const saveFilterSettings = () => {
    localStorage.setItem("filters", JSON.stringify(filterSettings));
  };
  const handleChange = (property) => {
    if (property === "showAllDays")
      setfilterSettings((prevState) => ({
        [property]: !prevState.showAllDays,
        showOnlyMine: prevState.showAllDays,
        showEveryoneExceptMe: prevState.showAllDays,
        showOnlyCleaned: prevState.showAllDays,
        showOnlyNotCleaned: prevState.showAllDays,
      }));
    else
      setfilterSettings((prevState) => ({
        ...prevState,
        showAllDays: false,
        [property]: !prevState[property],
      }));
  };
  return (
    <>
      <div className="filter-settings">
        <form action="">
          <h4>Filter settings</h4>
          <div className="setting">
            <label>Show all days</label>
            <BootstrapSwitchButton
              checked={filterSettings.showAllDays}
              onstyle="outline-primary"
              offstyle="outline-secondary"
              onChange={() => handleChange("showAllDays")}
            />
          </div>
          <div className="setting">
            <label htmlFor="">Show mine days of cleaning</label>
            <BootstrapSwitchButton
              checked={filterSettings.showOnlyMine}
              onstyle="outline-primary"
              offstyle="outline-secondary"
              onChange={() => handleChange("showOnlyMine")}
            />
          </div>
          <div className="setting">
            <label>Show everyone's else'</label>
            <BootstrapSwitchButton
              checked={filterSettings.showEveryoneExceptMe}
              onstyle="outline-primary"
              offstyle="outline-secondary"
              onChange={() => handleChange("showEveryoneExceptMe")}
            />
          </div>
          <div className="setting">
            <label>Show cleaned days</label>
            <BootstrapSwitchButton
              checked={filterSettings.showOnlyCleaned}
              onstyle="outline-primary"
              offstyle="outline-secondary"
              onChange={() => handleChange("showOnlyCleaned")}
            />
          </div>
          <div className="setting">
            <label>Show not-cleaned days</label>
            <BootstrapSwitchButton
              checked={filterSettings.showOnlyNotCleaned}
              onstyle="outline-primary"
              offstyle="outline-secondary"
              onChange={() => handleChange("showOnlyNotCleaned")}
            />
          </div>

          <Button
            type="submit"
            className="button-settings-save"
            onClick={saveFilterSettings}
          >
            Save changes
          </Button>
        </form>
      </div>
    </>
  );
}

export default FilterSettings;
