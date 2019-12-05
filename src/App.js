import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Europe from "./components/EuropeMap.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import City from "./components/City.jsx"; //Should be removed?
import Result from "./components/Result.jsx";
import About from "./components/About.jsx";

function App() {
    // Date states
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // Date states end
    const [city, setCity] = useState(""); 
    const [country, setCountry] = useState("");

    const [clearCities, setClearCities] = useState(false);
    return (
        <div className="App">
            {
                //create react components / routes here
            }
            <Header />
            <Router>
                <Switch>
                    <Route path="/city" component={City} /> {/*Should be removed?*/}
                    <Route path="/result">
                        <Result
                            endDate={endDate}
                            startDate={startDate}
                            country={country}
                            city={city}
                            setClearCities={setClearCities}
                        />
                    </Route>
                    <Route path="/about" component={About} />
                    <Route exact path="/">
                        <Europe
                            countryProp={country}
                            cityProp={city}
                            clearCities={clearCities}
                            setCountryProp={setCountry}
                            setCityProp={setCity}
                            setClearCities={setClearCities}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        />
                    </Route>
                    <Route path="*" component={NoMatch} />
                </Switch>
            </Router>
            <Footer />
        </div>
    );
}

/**
 * Move this to components, if it becomes more complex than this.
 */
const NoMatch = () => {
    return <h1>There is nothing here.</h1>;
};

export default App;
