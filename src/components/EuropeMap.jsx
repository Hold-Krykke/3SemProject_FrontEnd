import React, { useState, useEffect } from "react";
import "../App.css";
import MapViewer from "./MapViewer";
import styles from './EuropeMapStyles.css'
import DateSelector from "./Date.jsx";

/**	
 * Parent component, controls state for city and country 
 * The names can be confusing so some of the props have "Prop" added to their names
 */
const EuropeMap = ({
    countryProp,
    setCountryProp,
    cityProp,
    setCityProp,
    clearCities,
    setClearCities,
    startDate,
    setStartDate,
    endDate,
    setEndDate
}) => {

    const initialState = [{
        cityName: '',
        x: '',
        y: ''
    }];
    const countriesWithCities = hardcodedCountryList();
    const [chosenCountryWithCities, setChosenCountryWithCities] = useState(initialState);
    const [showDatePicker, setShowDatePicker] = useState(false);

    function handleCountryChange(country) {
        setCountryProp(country);
    };

    function handleCityChange(city) {
        setCityProp(city);
        setClearCities(true);
        setShowDatePicker(true);
        setStartDate(new Date());
        setEndDate(new Date());
    };

    function handleCityView(clear) {
        if (clear) {
            setChosenCountryWithCities([]);
            setCountryProp("");
            setCityProp("");
            return;
        }
        if (cityProp !== '') {
            setCityProp('');
        }
        let showCities = countriesWithCities.filter(
            country => { return country.countryName === countryProp }).map(matchingCountry => matchingCountry.cities);
        setChosenCountryWithCities(...showCities);
    }
    useEffect(() => {
        handleCityView(clearCities);
        if (clearCities) {
            setClearCities(false);
        }
    }, [countryProp]);

    return (
        <div className="europeMapContainer">
            <div id="mapcontainer" style={{ position: "relative", display: "inline-block" }}>
                <MapViewer
                    onCountryChange={handleCountryChange}
                    countryChosen={countryProp} />

                {chosenCountryWithCities && chosenCountryWithCities.map((city, index) => (
                    <button className="cityButton" style={{ position: 'absolute', top: city.y + 'px', left: city.x + 'px' }}
                        onClick={() => handleCityChange(city.cityName)} value={city.cityName} key={index} >{city.cityName}</button>
                ))}
            </div>
            <div id="outputCountry">
                <p>{countryProp}</p>
            </div>
            <DateSelector
                city={cityProp}
                country={countryProp}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        </div>
    );
};

export default EuropeMap;


/**	
 * Hardcoded data (absolute pixelplacement) for city button placement 
 * for all countries in relation to the SVG (relative). 	
 */
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
                            "x": "505",
                            "y": "470"
                        },
                        {
                            "cityName": "Göteborg",
                            "x": "255",
                            "y": "540"
                        },
                        {
                            "cityName": "Malmö",
                            "x": "330",
                            "y": "640"
                        },
                        {
                            "cityName": "Uppsala",
                            "x": "448",
                            "y": "405"
                        },
                        {
                            "cityName": "Västerås",
                            "x": "385",
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
                            "x": "175",
                            "y": "415"
                        },
                        {
                            "cityName": "Akureyri",
                            "x": "550",
                            "y": "240"
                        },
                        {
                            "cityName": "Selfoss",
                            "x": "275",
                            "y": "460"
                        }
                    ]
            },
            {
                "countryName": "United Kingdom",
                "countryCode": "gb",
                "cities":
                    [
                        {
                            "cityName": "London",
                            "x": "620",
                            "y": "570"
                        },
                        {
                            "cityName": "Glasgow",
                            "x": "400",
                            "y": "285"
                        }
                    ]
            },
            {
                "countryName": "Ireland",
                "countryCode": "ie",
                "cities":
                    [
                        {
                            "cityName": "Dublin",
                            "x": "750",
                            "y": "345"
                        },
                        {
                            "cityName": "Cork",
                            "x": "430",
                            "y": "590"
                        },
                        {
                            "cityName": "Gaillimh",
                            "x": "335",
                            "y": "338"
                        }
                    ]
            },
            {
                "countryName": "France",
                "countryCode": "fr",
                "cities":
                    [
                        {
                            "cityName": "Paris",
                            "x": "460",
                            "y": "130"
                        },
                        {
                            "cityName": "Marseille",
                            "x": "620",
                            "y": "520"
                        },
                        {
                            "cityName": "Lyon",
                            "x": "610",
                            "y": "380"
                        },
                        {
                            "cityName": "Toulouse",
                            "x": "400",
                            "y": "500"
                        },
                        {
                            "cityName": "Nantes",
                            "x": "230",
                            "y": "240"
                        }
                    ]
            },
            {
                "countryName": "Andorra",
                "countryCode": "ad",
                "cities":
                    [
                        {
                            "cityName": "Andorra la Vella",
                            "x": "280",
                            "y": "390"
                        },
                        {
                            "cityName": "Encamp",
                            "x": "460",
                            "y": "310"
                        },
                        {
                            "cityName": "Sant Julià de Lòria",
                            "x": "200",
                            "y": "520"
                        },
                        {
                            "cityName": "la Massana",
                            "x": "305",
                            "y": "220"
                        }
                    ]
            },
            {
                "countryName": "Spain",
                "countryCode": "es",
                "cities":
                    [
                        {
                            "cityName": "Madrid",
                            "x": "380",
                            "y": "280"
                        },
                        {
                            "cityName": "Barcelona",
                            "x": "780",
                            "y": "190"
                        },
                        {
                            "cityName": "Valencia",
                            "x": "600",
                            "y": "350"
                        },
                        {
                            "cityName": "Sevilla",
                            "x": "210",
                            "y": "560"
                        },
                        {
                            "cityName": "Zaragoza",
                            "x": "575",
                            "y": "160"
                        }
                    ]
            },
            {
                "countryName": "Portugal",
                "countryCode": "pt",
                "cities":
                    [
                        {
                            "cityName": "Lisbon",
                            "x": "315",
                            "y": "415"
                        },
                        {
                            "cityName": "Porto",
                            "x": "390",
                            "y": "125"
                        },
                        {
                            "cityName": "Braga",
                            "x": "430",
                            "y": "60"
                        },
                        {
                            "cityName": "Setúbal",
                            "x": "340",
                            "y": "470"
                        },
                        {
                            "cityName": "Coimbra",
                            "x": "430",
                            "y": "220"
                        }
                    ]
            },
            {
                "countryName": "Netherlands",
                "countryCode": "nl",
                "cities":
                    [
                        {
                            "cityName": "Amsterdam",
                            "x": "395",
                            "y": "255"
                        },
                        {
                            "cityName": "Rotterdam",
                            "x": "270",
                            "y": "390"
                        },
                        {
                            "cityName": "Utrecht",
                            "x": "470",
                            "y": "340"
                        },
                        {
                            "cityName": "Eindhoven",
                            "x": "500",
                            "y": "485"
                        },
                        {
                            "cityName": "Groningen",
                            "x": "710",
                            "y": "35"
                        }
                    ]
            },
            {
                "countryName": "Luxembourg",
                "countryCode": "lu",
                "cities":
                    [
                        {
                            "cityName": "Luxembourg",
                            "x": "460",
                            "y": "540"
                        },
                        {
                            "cityName": "Esch-sur-Alzette",
                            "x": "335",
                            "y": "620"
                        },
                        {
                            "cityName": "Ettelbruck",
                            "x": "450",
                            "y": "280"
                        }
                    ]
            },
            {
                "countryName": "Belgium",
                "countryCode": "be",
                "cities":
                    [
                        {
                            "cityName": "Brussels",
                            "x": "420",
                            "y": "205"
                        },
                        {
                            "cityName": "Antwerpen",
                            "x": "430",
                            "y": "80"
                        },
                        {
                            "cityName": "Charleroi",
                            "x": "460",
                            "y": "360"
                        }
                    ]
            },
            {
                "countryName": "Switzerland",
                "countryCode": "ch",
                "cities":
                    [
                        {
                            "cityName": "Zürich",
                            "x": "515",
                            "y": "190"
                        },
                        {
                            "cityName": "Genève",
                            "x": "5",
                            "y": "475"
                        },
                        {
                            "cityName": "Basel",
                            "x": "325",
                            "y": "125"
                        },
                        {
                            "cityName": "Bern",
                            "x": "305",
                            "y": "255"
                        },
                        {
                            "cityName": "Lausanne",
                            "x": "95",
                            "y": "410"
                        }
                    ]
            },
            {
                "countryName": "Liechtenstein",
                "countryCode": "li",
                "cities":
                    [
                        {
                            "cityName": "Schaan",
                            "x": "360",
                            "y": "290"
                        },
                        {
                            "cityName": "Vaduz",
                            "x": "355",
                            "y": "405"
                        },
                        {
                            "cityName": "Triesen",
                            "x": "359",
                            "y": "485"
                        },
                        {
                            "cityName": "Balzers",
                            "x": "325",
                            "y": "360"
                        },
                        {
                            "cityName": "Eschen",
                            "x": "405",
                            "y": "160"
                        }
                    ]
            },
            {
                "countryName": "Italy",
                "countryCode": "it",
                "cities":
                    [
                        {
                            "cityName": "Rome",
                            "x": "475",
                            "y": "325"
                        },
                        {
                            "cityName": "Milan",
                            "x": "285",
                            "y": "80"
                        },
                        {
                            "cityName": "Naples",
                            "x": "585",
                            "y": "395"
                        },
                        {
                            "cityName": "Turin",
                            "x": "200",
                            "y": "115"
                        },
                        {
                            "cityName": "Palermo",
                            "x": "525",
                            "y": "575"
                        }
                    ]
            },
            {
                "countryName": "Austria",
                "countryCode": "at",
                "cities":
                    [
                        {
                            "cityName": "Vienna",
                            "x": "875",
                            "y": "255"
                        },
                        {
                            "cityName": "Graz",
                            "x": "760",
                            "y": "450"
                        },
                        {
                            "cityName": "Linz",
                            "x": "605",
                            "y": "230"
                        },
                        {
                            "cityName": "Salzburg",
                            "x": "425",
                            "y": "315"
                        },
                        {
                            "cityName": "Innsbruck",
                            "x": "205",
                            "y": "385"
                        }
                    ]
            },
            {
                "countryName": "Czechia",
                "countryCode": "cz",
                "cities":
                    [
                        {
                            "cityName": "Prague",
                            "x": "320",
                            "y": "265"
                        },
                        {
                            "cityName": "Brno",
                            "x": "640",
                            "y": "430"
                        },
                        {
                            "cityName": "Ostrava",
                            "x": "875",
                            "y": "328"
                        },
                        {
                            "cityName": "Pilsen",
                            "x": "155",
                            "y": "340"
                        },
                        {
                            "cityName": "Olomouc",
                            "x": "705",
                            "y": "375"
                        }
                    ]
            },
            {
                "countryName": "Slovenia",
                "countryCode": "si",
                "cities":
                    [
                        {
                            "cityName": "Ljubljana",
                            "x": "340",
                            "y": "365"
                        },
                        {
                            "cityName": "Maribor",
                            "x": "685",
                            "y": "175"
                        },
                        {
                            "cityName": "Celje",
                            "x": "605",
                            "y": "310"
                        },
                        {
                            "cityName": "Kranj",
                            "x": "295",
                            "y": "295"
                        },
                        {
                            "cityName": "Velenje",
                            "x": "515",
                            "y": "230"
                        }
                    ]
            },
            {
                "countryName": "Croatia",
                "countryCode": "hr",
                "cities":
                    [
                        {
                            "cityName": "Zagreb",
                            "x": "390",
                            "y": "95"
                        },
                        {
                            "cityName": "Split",
                            "x": "499",
                            "y": "485"
                        },
                        {
                            "cityName": "Rijeka",
                            "x": "230",
                            "y": "185"
                        },
                        {
                            "cityName": "Osijek",
                            "x": "760",
                            "y": "144"
                        },
                        {
                            "cityName": "Zadar",
                            "x": "330",
                            "y": "378"
                        }
                    ]
            },
            {
                "countryName": "Bosnia and Herzegovina",
                "countryCode": "ba",
                "cities":
                    [
                        {
                            "cityName": "Sarajevo",
                            "x": "630",
                            "y": "350"
                        },
                        {
                            "cityName": "Banja Luka",
                            "x": "370",
                            "y": "90"
                        }
                    ]
            },
            {
                "countryName": "Montenegro",
                "countryCode": "me",
                "cities":
                    [
                        {
                            "cityName": "Podgorica",
                            "x": "410",
                            "y": "460"
                        },
                        {
                            "cityName": "Herceg-Novi",
                            "x": "200",
                            "y": "420"
                        },
                        {
                            "cityName": "Pljevlja",
                            "x": "395",
                            "y": "45"
                        },
                        {
                            "cityName": "Budva",
                            "x": "320",
                            "y": "505"
                        }
                    ]
            },
            {
                "countryName": "Albania",
                "countryCode": "al",
                "cities":
                    [
                        {
                            "cityName": "Tirana",
                            "x": "415",
                            "y": "270"
                        },
                        {
                            "cityName": "Durrës",
                            "x": "310",
                            "y": "285"
                        },
                        {
                            "cityName": "Elbasan",
                            "x": "455",
                            "y": "345"
                        },
                        {
                            "cityName": "Vlorë",
                            "x": "365",
                            "y": "495"
                        },
                        {
                            "cityName": "Shkodër",
                            "x": "345",
                            "y": "95"
                        }
                    ]
            },
            {
                "countryName": "Greece",
                "countryCode": "gr",
                "cities":
                    [
                        {
                            "cityName": "Athens",
                            "x": "450",
                            "y": "360"
                        },
                        {
                            "cityName": "Thessaloníki",
                            "x": "330",
                            "y": "90"
                        },
                        {
                            "cityName": "Pátra",
                            "x": "295",
                            "y": "340"
                        },
                        {
                            "cityName": "Lárisa",
                            "x": "330",
                            "y": "195"
                        },
                        {
                            "cityName": "Irákleion",
                            "x": "575",
                            "y": "620"
                        }
                    ]
            },
            {
                "countryName": "Ukraine",
                "countryCode": "ua",
                "cities":
                    [
                        {
                            "cityName": "Kyiv",
                            "x": "415",
                            "y": "155"
                        },
                        {
                            "cityName": "Kharkiv",
                            "x": "725",
                            "y": "210"
                        },
                        {
                            "cityName": "Dnipro",
                            "x": "680",
                            "y": "320"
                        },
                        {
                            "cityName": "Donetsk",
                            "x": "835",
                            "y": "350"
                        },
                        {
                            "cityName": "Odessa",
                            "x": "460",
                            "y": "455"
                        }
                    ]
            },
            {
                "countryName": "North Macedonia",
                "countryCode": "mk",
                "cities":
                    [
                        {
                            "cityName": "Skopje",
                            "x": "330",
                            "y": "120"
                        },
                        {
                            "cityName": "Bitola",
                            "x": "340",
                            "y": "605"
                        },
                        {
                            "cityName": "Kumanovo",
                            "x": "450",
                            "y": "70"
                        },
                        {
                            "cityName": "Prilep",
                            "x": "425",
                            "y": "425"
                        },
                        {
                            "cityName": "Tetovo",
                            "x": "165",
                            "y": "120"
                        }
                    ]
            },
            {
                "countryName": "Kosovo",
                "countryCode": "xk",
                "cities":
                    [
                        {
                            "cityName": "Pristina",
                            "x": "555",
                            "y": "275"
                        },
                        {
                            "cityName": "Prizren",
                            "x": "430",
                            "y": "520"
                        },
                        {
                            "cityName": "Mitrovicë",
                            "x": "425",
                            "y": "165"
                        },
                        {
                            "cityName": "Gjakovë",
                            "x": "295",
                            "y": "415"
                        },
                        {
                            "cityName": "Ferizaj",
                            "x": "560",
                            "y": "440"
                        }
                    ]
            },
            {
                "countryName": "Serbia",
                "countryCode": "rs",
                "cities":
                    [
                        {
                            "cityName": "Belgrade",
                            "x": "375",
                            "y": "219"
                        },
                        {
                            "cityName": "Novi Sad",
                            "x": "310",
                            "y": "145"
                        }
                    ]
            },
            {
                "countryName": "Hungary",
                "countryCode": "hu",
                "cities":
                    [
                        {
                            "cityName": "Budapest",
                            "x": "395",
                            "y": "255"
                        },
                        {
                            "cityName": "Debrecen",
                            "x": "785",
                            "y": "255"
                        },
                        {
                            "cityName": "Miskolc",
                            "x": "645",
                            "y": "175"
                        },
                        {
                            "cityName": "Szeged",
                            "x": "580",
                            "y": "490"
                        },
                        {
                            "cityName": "Pécs",
                            "x": "315",
                            "y": "535"
                        }
                    ]
            },
            {
                "countryName": "Slovakia",
                "countryCode": "sk",
                "cities":
                    [
                        {
                            "cityName": "Bratislava",
                            "x": "49",
                            "y": "445"
                        },
                        {
                            "cityName": "Košice",
                            "x": "740",
                            "y": "320"
                        },
                        {
                            "cityName": "Prešov",
                            "x": "730",
                            "y": "250"
                        },
                        {
                            "cityName": "Nitra",
                            "x": "195",
                            "y": "395"
                        },
                        {
                            "cityName": "Žilina",
                            "x": "280",
                            "y": "190"
                        }
                    ]
            },
            {
                "countryName": "Poland",
                "countryCode": "pl",
                "cities":
                    [
                        {
                            "cityName": "Warsaw",
                            "x": "625",
                            "y": "290"
                        },
                        {
                            "cityName": "Kraków",
                            "x": "565",
                            "y": "520"
                        }
                    ]
            },
            {
                "countryName": "Lithuania",
                "countryCode": "lt",
                "cities":
                    [
                        {
                            "cityName": "Vilnius",
                            "x": "755",
                            "y": "445"
                        },
                        {
                            "cityName": "Kaunas",
                            "x": "525",
                            "y": "375"
                        },
                        {
                            "cityName": "Šiauliai",
                            "x": "345",
                            "y": "125"
                        }
                    ]
            },
            {
                "countryName": "Latvia",
                "countryCode": "lv",
                "cities":
                    [
                        {
                            "cityName": "Riga",
                            "x": "405",
                            "y": "280"
                        },
                        {
                            "cityName": "Daugavpils",
                            "x": "710",
                            "y": "490"
                        },
                        {
                            "cityName": "Jelgava",
                            "x": "345",
                            "y": "360"
                        },
                        {
                            "cityName": "Jūrmala",
                            "x": "295",
                            "y": "305"
                        }
                    ]
            },
            {
                "countryName": "Estonia",
                "countryCode": "ee",
                "cities":
                    [
                        {
                            "cityName": "Tallinn",
                            "x": "425",
                            "y": "135"
                        },
                        {
                            "cityName": "Tartu",
                            "x": "750",
                            "y": "345"
                        },
                        {
                            "cityName": "Narva",
                            "x": "915",
                            "y": "155"
                        },
                        {
                            "cityName": "Pärnu",
                            "x": "405",
                            "y": "355"
                        },
                        {
                            "cityName": "Viljandi",
                            "x": "565",
                            "y": "365"
                        }
                    ]
            },
            {
                "countryName": "Belarus",
                "countryCode": "by",
                "cities":
                    [
                        {
                            "cityName": "Minsk",
                            "x": "360",
                            "y": "280"
                        },
                        {
                            "cityName": "Homyel'",
                            "x": "780",
                            "y": "495"
                        },
                        {
                            "cityName": "Mahilyow",
                            "x": "660",
                            "y": "300"
                        },
                        {
                            "cityName": "Vitebsk",
                            "x": "640",
                            "y": "125"
                        },
                        {
                            "cityName": "Hrodna",
                            "x": "31",
                            "y": "340"
                        }
                    ]
            },
            {
                "countryName": "Moldova",
                "countryCode": "md",
                "cities":
                    [
                        {
                            "cityName": "Chisinau",
                            "x": "555",
                            "y": "305"
                        },
                        {
                            "cityName": "Tiraspol",
                            "x": "700",
                            "y": "350"
                        },
                        {
                            "cityName": "BĒlţi",
                            "x": "360",
                            "y": "120"
                        },
                        {
                            "cityName": "Cahul",
                            "x": "480",
                            "y": "550"
                        }
                    ]
            },
            {
                "countryName": "Romania",
                "countryCode": "ro",
                "cities":
                    [
                        {
                            "cityName": "Bucharest",
                            "x": "605",
                            "y": "510"
                        },
                        {
                            "cityName": "Cluj-Napoca",
                            "x": "280",
                            "y": "190"
                        },
                        {
                            "cityName": "Craiova",
                            "x": "350",
                            "y": "545"
                        }
                    ]
            },
            {
                "countryName": "Bulgaria",
                "countryCode": "bg",
                "cities":
                    [
                        {
                            "cityName": "Sofia",
                            "x": "130",
                            "y": "310"
                        },
                        {
                            "cityName": "Plovdiv",
                            "x": "370",
                            "y": "480"
                        },
                        {
                            "cityName": "Varna",
                            "x": "885",
                            "y": "220"
                        },
                        {
                            "cityName": "Burgas",
                            "x": "810",
                            "y": "375"
                        },
                        {
                            "cityName": "Ruse",
                            "x": "570",
                            "y": "95"
                        }
                    ]
            },
            {
                "countryName": "Cyprus",
                "countryCode": "cy",
                "cities":
                    [
                        {
                            "cityName": "Nicosia",
                            "x": "570",
                            "y": "165"
                        },
                        {
                            "cityName": "Limassol",
                            "x": "385",
                            "y": "465"
                        },
                        {
                            "cityName": "Larnaca",
                            "x": "705",
                            "y": "325"
                        },
                        {
                            "cityName": "Paphos",
                            "x": "80",
                            "y": "410"
                        }
                    ]
            }
        ];
    return hardcodedCountriesWithCities;
}

