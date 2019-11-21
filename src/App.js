import React from "react";
import "./App.css";
import Europe from "./components/EuropeMap.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="App">
      {
        //create react components / routes here
      }
      <Header />
      <p>Semester Project</p>
      <Europe></Europe>
      <Footer />
    </div>
  );
}

export default App;
