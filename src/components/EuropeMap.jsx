import React, { useEffect } from "react";
import "../App.css";
import SVGMap from "../svg_files/Europe.js";
import facade from "../apiFacade.js";

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
      let output = document.getElementById("outputCountry");
      let mainSVG = document.getElementById("svg2");
      let previousTarget = "";
      let England = mainSVG.querySelector("#gb-gbn");
      let N_Ireland = mainSVG.querySelector("#gb-nir");

      let highlightStyle = "fill:#29B6F6;stroke:#ffffff;stroke-width:0.11153841;stroke-miterlimit:4;stroke-dasharray:none";
      let standardStyle = "fill:#c0c0c0;stroke:#ffffff;stroke-width:0.40000001;stroke-miterlimit:4;stroke-dasharray:none";

      mainSVG.addEventListener("click", function(event) {
        if (previousTarget !== "") {
          previousTarget.style = standardStyle;
          //Special treatment for England
          if (previousTarget.id === "gb-nir" || previousTarget.id === "gb-gbn") {
            England.style = standardStyle;
            N_Ireland.style = standardStyle;
          }
        }
        previousTarget = event.target;
        event.target.style = highlightStyle;

        //Special treatment for England
        if (event.target.id === "gb-nir" || event.target.id === "gb-gbn") {
          England.style = highlightStyle;
          N_Ireland.style = highlightStyle;
        }

        let targetID = event.target.id;

        //Part that fetches country name and displays it
        if (targetID === "svg2") {
          output.innerHTML = "---";
          return;
        }
        if (targetID.length > 2) targetID = targetID.slice(0,2);
        const promise = facade.getCountryNameByAlpha2(targetID);
        promise
          .then(data => {
            output.innerHTML = data.Countryname;
          })
          .catch(err => {
            if (err.status) {
              err.fullError.then(
                err => (console.log(err))
              );
            } else {
              console.log("Network error");
              output.innerHTML = "Network error";
            }
          });
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
