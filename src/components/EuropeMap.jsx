import React, { useState, useEffect } from "react";
import "../App.css";
//import SVGMap from "../svg_files/Europe.js";
import facade from "../apiFacade.js";
import MapViewer from "./MapViewer";

/**
 * To make dangerouslySetInnerHTML work we have to insert an object with
 * a single key:value pair, where the key is named "__html" and the value
 * is the SVG that we want to load. This object is then returned and used in
 * the div where we want to show the SVG.
 */
// function createMarkup() {
//     return { __html: SVGMap() };
// }

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
    const [countryChosen, setCountryChosen] = useState('');
    const [cityChosen, setCityChosen] = useState('');

    // let output = document.getElementById("outputCountry");
    // let mainSVG = document.getElementById("svg2");
    // let previousTarget = "";
    // const viewBoxInitValue = mainSVG.getAttribute('viewBox');

    // let highlightStyle =
    //     "fill:#29B6F6;stroke:#black;stroke-width:0.11153841;stroke-miterlimit:4;stroke-dasharray:none";
    // let standardStyle =
    //     "fill:#c0c0c0;stroke:#black;stroke-width:0.40000001;stroke-miterlimit:4;stroke-dasharray:none";

    function handleCountryChange(country) {
        setCountryChosen(country);
        console.log('country in parameter', country);
        console.log('state', countryChosen);
    };

    function handleCityChange(city) {
        setCityChosen(city);
    };

    useEffect(() => {
        // function setupCountryChooser() {
        // mainSVG.addEventListener("click", function (event) {
        //     if (previousTarget !== "") {
        //         previousTarget.style = standardStyle;
        //     }
        //     previousTarget = event.target;
        //     if (event.target.id !== 'svg2') {
        //         event.target.style = highlightStyle;
        //     }

        //     let targetID = event.target.id;

        //     setCountryChosen(zoomAndPan(mainSVG, targetID, viewBoxInitValue));
        //     console.log('USESTATE COUNTRYCHOSEN = ', countryChosen);
        //     //Part that fetches country name and displays it
        //     if (targetID === "svg2") {
        //         output.innerHTML = "---";
        //         return;
        //     }
        //     if (targetID.length > 2) targetID = targetID.slice(0, 2);
        //     const promise = facade.getCountryNameByAlpha2(targetID);
        //     promise
        //         .then(data => {
        //             output.innerHTML = data.Countryname;
        //         })
        //         .catch(err => {
        //             if (err.status) {
        //                 err.fullError.then(err => console.log(err));
        //             } else {
        //                 console.log("Network error");
        //                 output.innerHTML = "Network error";
        //             }
        //         });
        // });
        // }
        // setupCountryChooser();
        console.log('state', countryChosen);
    }, [countryChosen]);

    return (
        <>
            <p>Semester Project</p>
            <h3>Choose a country</h3>
            <br></br>
            <div style={{ position: "relative", display: "inline-block" }}>
                {/* <div name="europeMapDiv" style={{ display: "inline-block" }} dangerouslySetInnerHTML={createMarkup()}>
                </div> */}
                <MapViewer
                    onCountryChange={handleCountryChange}
                    onCityChange={handleCityChange}
                    countryChosen={countryChosen} />
                {/* <button style={{ position: "absolute", top: "425px", left: "600px" }} onClick={testClickListener} value="city">city</button> */}


            </div>
            <div id="outputCountry">
                <p>{countryChosen}</p>
            </div>
        </>
    );
};


// function handleMapClick(event) {
//     if (previousTarget !== "") {
//         previousTarget.style = standardStyle;
//     }
//     previousTarget = event.target;
//     if (event.target.id !== 'svg2') {
//         event.target.style = highlightStyle;
//     }

//     let targetID = event.target.id;

//     setCountryChosen(zoomAndPan(mainSVG, targetID, viewBoxInitValue));
//     console.log('USESTATE COUNTRYCHOSEN = ', countryChosen);
//     //Part that fetches country name and displays it
//     if (targetID === "svg2") {
//         output.innerHTML = "---";
//         return;
//     }
//     if (targetID.length > 2) targetID = targetID.slice(0, 2);
//     const promise = facade.getCountryNameByAlpha2(targetID);
//     promise
//         .then(data => {
//             output.innerHTML = data.Countryname;
//         })
//         .catch(err => {
//             if (err.status) {
//                 err.fullError.then(err => console.log(err));
//             } else {
//                 console.log("Network error");
//                 output.innerHTML = "Network error";
//             }
//         });

// }


function testClickListener(event) {
    alert(event.target.value);
}

// for work with zoom/pan in next pull-request
// this is just initial trying to understand how to manipulate viewbox
// and how to use bbox and viewport
// function zoomAndPan(mainSVG, pathElementID, viewBoxInitValue) {
//     console.log('viewBoxInitValue ', viewBoxInitValue);
//     let bboxPath = document.getElementById(pathElementID).getBoundingClientRect();
//     let bboxSvg = document.getElementById('svg2').getBoundingClientRect();
//     console.log('bboxPath ', bboxPath);
//     console.log('bboxSVG ', bboxSvg);

//     let xCountry = bboxPath.x;
//     let yCountry = bboxPath.y;
//     let xMap = bboxSvg.x;
//     let yMap = bboxSvg.y;
//     let widthCountry = bboxPath.width;
//     let heightCountry = bboxPath.height;

//     let xCenterCountry = ((xCountry - xMap) + (widthCountry / 2));
//     let yCenterCountry = ((yCountry - yMap) + (heightCountry / 2));

//     let xCenter = xCenterCountry - (widthCountry / 2);
//     let yCenter = yCenterCountry - (heightCountry / 2);

//     let zoomedIn = false;

//     if (viewBoxInitValue !== mainSVG.getAttribute('viewBox')) {
//         mainSVG.setAttribute("viewBox", viewBoxInitValue);
//         zoomedIn = false;
//         console.log('VIEWBOX SET TO INIT', mainSVG.getAttribute('viewBox'));
//         console.log('ZOOMEDIN IF', zoomedIn);
//     } else {
//         mainSVG.setAttribute("viewBox", xCenter + " " + yCenter + " " + widthCountry + " " + heightCountry);
//         zoomedIn = true;
//         console.log('VIEWBOX SET TO ZOOM', mainSVG.getAttribute('viewBox'));
//         console.log('ZOOMEDIN ELSE', zoomedIn);
//     }
//     return zoomedIn;
// }

export default EuropeMap;
