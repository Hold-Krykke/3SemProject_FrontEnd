import React, { useState, useEffect } from "react";
import "../App.css";
import MapViewer from "./MapViewer";

const EuropeMap = () => {

    const initialState = [{
        cityName: '',
        x: '',
        y: ''
    }];
    const countriesWithCities = hardcodedCountryList();
    const [chosenCountryWithCities, setChosenCountryWithCities] = useState(initialState);
    const [countryChosen, setCountryChosen] = useState('');
    const [cityChosen, setCityChosen] = useState('');

    function handleCountryChange(country) {
        setCountryChosen(country);
    };

    function handleCityChange(city) {
        setCityChosen(city);
    };

    useEffect(() => {
        let showCities = countriesWithCities.filter(
            country => { return country.countryName === countryChosen }).map(matchingCountry => matchingCountry.cities);
        setChosenCountryWithCities(...showCities);
    }, [countryChosen]);

    return (
        <>
            <p>Semester Project</p>
            <h3>Choose a country</h3>
            <br></br>
            <div id="mapcontainer" style={{ position: "relative", display: "inline-block" }}>
                <MapViewer
                    onCountryChange={handleCountryChange}
                    onCityChange={handleCityChange}
                    countryChosen={countryChosen} />

                {chosenCountryWithCities && chosenCountryWithCities.map((city, index) => (
                    <button style={{ position: 'absolute', top: city.y + 'px', left: city.x + 'px' }}
                        onClick={() => handleCityChange(city.cityName)} value={city.cityName} key={index} >{city.cityName}</button>
                ))}
            </div>
            <div id="outputCountry">
                <p>{countryChosen}</p>
                <p>{cityChosen}</p>
            </div>
        </>
    );
};

export default EuropeMap;

function hardcodedCountryList() {
    const hardcodedCountriesWithCities =
        [
            {
                "countryName": "Denmark",
                "countryCode": "dk",
                "cities": [{
                    "cityName": "Copenhagen",
                    "x": "545.6",
                    "y": "328.1"
                },
                {
                    "cityName": "Aarhus",
                    "x": "519.8",
                    "y": "320.3"
                }
                ]
            },
            {
                "countryName": "Germany",
                "countryCode": "de",
                "cities": [{
                    "cityName": "Berlin",
                    "x": "219.8",
                    "y": "520.3"
                },
                {
                    "cityName": "Hamburg",
                    "x": "519.8",
                    "y": "320.3"
                }]
            }
        ];
    return hardcodedCountriesWithCities;
}

