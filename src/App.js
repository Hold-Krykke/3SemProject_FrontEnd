import React from "react";
import "./App.css";
import Europe from "./components/EuropeMap.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="App">
      {
        //create react components / routes here
      }
      <Header></Header>
      <p>Semester Project</p>
      <Europe></Europe>
    </div>
  );
}

export default App;
