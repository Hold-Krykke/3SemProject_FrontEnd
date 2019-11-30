import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/result">
            <p>
              <a href="#/">Click a Country</a> ->{" "}
              <a href="#/city">Click a City</a> -> Pick a Date -> Result
            </p>
          </Route>
          <Route path="/city">
            <p>
              <a href="#/">Click a Country</a> -> Click a City -> Pick a Date ->
              Result
            </p>
          </Route>
          <Route path="*">
            <p>Click a Country -> Click a City -> Pick a Date -> Result</p>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Header;
