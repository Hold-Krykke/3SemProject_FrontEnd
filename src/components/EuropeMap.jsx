import React, { useEffect } from "react";
import "../App.css";
import SVGMap from "../svg_files/Europe.js";

/**
 * To make dangerouslySetInnerHTML work we have to insert an object with
 * a single key:value pair, where the key is named "__html" and the value
 * is the SVG that we want to load. This object is then returned and used in
 * the div where we want to show the SVG.
 */
function createMarkup() {
  return { __html: SVGMap() };
}

/**
 * This component renders the Europe map. We're using an SVG map that has
 * namespace attributes which means that the attribute are written with a
 * syntax that react can't handle e.g. "class" instead of react's "className".
 * We can't render the map as a react component because of the namespace
 * attributes so we have to put the SVG inside the innerHTML of a div
 * in order to make it work.
 * (innerHTML in react is referred to as dangerouslySetInnerHTML)
 * The useEffect hook runs some plain JavaScript that creates functionality
 * that lets the user visually "choose" a country.
 */
const EuropeMap = () => {

  useEffect(() => {
    function setupCountryChooser() {

      var output = document.getElementById("outputCountry");
      var mainSVG = document.getElementById("svg2");
      var previousTarget = "";

      mainSVG.addEventListener("click", function(event) {
        if (previousTarget !== "") {
          previousTarget.style =
            "fill:#c0c0c0;stroke:#ffffff;stroke-width:0.40000001;stroke-miterlimit:4;stroke-dasharray:none";
        }
        previousTarget = event.target;
        event.target.style =
          "fill:#29B6F6;stroke:#ffffff;stroke-width:0.11153841;stroke-miterlimit:4;stroke-dasharray:none";
        output.innerHTML = "Selected country";
      });
    }
    setupCountryChooser();
  }, []);

  return (
    <>
      <h3>Choose a country</h3>
      <br></br>
      <div name="europeMapDiv" dangerouslySetInnerHTML={createMarkup()}></div>
      <div id="outputCountry"></div>
    </>
  );
};

export default EuropeMap;