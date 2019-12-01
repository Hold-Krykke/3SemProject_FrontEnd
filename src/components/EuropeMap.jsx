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
        if (cityChosen !== '') {
            setCityChosen('');
        }
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


// Citydata goes here - data for Denmark and Germany 
// is just testdata and not correctly placed yet
function hardcodedCountryList() {
    const hardcodedCountriesWithCities =
        [
            {
                "countryName": "Denmark",
                "countryCode": "dk",
                "cities":
                    [
                        {
                            "cityName": "Copenhagen",
                            "x": "575",
                            "y": "400"
                        },
                        {
                            "cityName": "Aarhus",
                            "x": "265",
                            "y": "320"
                        },
                        {
                            "cityName": "Odense",
                            "x": "295",
                            "y": "453"
                        },
                        {
                            "cityName": "Aalborg",
                            "x": "205",
                            "y": "170"
                        }
                    ]
            },
            {
                "countryName": "Germany",
                "countryCode": "de",
                "cities":
                    [
                        {
                            "cityName": "Berlin",
                            "x": "665",
                            "y": "205"
                        },
                        {
                            "cityName": "Hamburg",
                            "x": "400",
                            "y": "85"
                        },
                        {
                            "cityName": "Munich",
                            "x": "580",
                            "y": "570"
                        },
                        {
                            "cityName": "Köln",
                            "x": "250",
                            "y": "335"
                        },
                        {
                            "cityName": "Frankfurt am Main",
                            "x": "310",
                            "y": "450"
                        }
                    ]
            },
            {
                "countryName": "Sweden",
                "countryCode": "se",
                "cities":
                    [
                        {
                            "cityName": "Stockholm",
                            "x": "495",
                            "y": "470"
                        },
                        {
                            "cityName": "Göteborg",
                            "x": "270",
                            "y": "540"
                        },
                        {
                            "cityName": "Malmö",
                            "x": "330",
                            "y": "650"
                        },
                        {
                            "cityName": "Uppsala",
                            "x": "448",
                            "y": "415"
                        },
                        {
                            "cityName": "Västerås",
                            "x": "390",
                            "y": "455"
                        }
                    ]
            },
            {
                "countryName": "Norway",
                "countryCode": "no",
                "cities":
                    [
                        {
                            "cityName": "Oslo",
                            "x": "490",
                            "y": "600"
                        },
                        {
                            "cityName": "Bergen",
                            "x": "345",
                            "y": "585"
                        },
                        {
                            "cityName": "Trondheim",
                            "x": "450",
                            "y": "495"
                        },
                        {
                            "cityName": "Stavanger",
                            "x": "340",
                            "y": "630"
                        }
                    ]
            },
            {
                "countryName": "Finland",
                "countryCode": "fi",
                "cities":
                    [
                        {
                            "cityName": "Helsinki",
                            "x": "455",
                            "y": "640"
                        },
                        {
                            "cityName": "Tampere",
                            "x": "380",
                            "y": "530"
                        },
                        {
                            "cityName": "Turku",
                            "x": "330",
                            "y": "610"
                        },
                        {
                            "cityName": "Oulu",
                            "x": "440",
                            "y": "305"
                        },
                        {
                            "cityName": "Lahti",
                            "x": "495",
                            "y": "565"
                        }
                    ]
            },
            {
                "countryName": "Iceland",
                "countryCode": "is",
                "cities":
                    [
                        {
                            "cityName": "Reykjavík",
                            "x": "180",
                            "y": "420"
                        },
                        {
                            "cityName": "Akureyri",
                            "x": "550",
                            "y": "240"
                        },
                        {
                            "cityName": "Selfoss",
                            "x": "270",
                            "y": "455"
                        }
                    ]
            }
        ];
    return hardcodedCountriesWithCities;
}

