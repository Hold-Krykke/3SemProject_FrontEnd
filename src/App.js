import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Europe from "./components/EuropeMap.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import City from "./components/City.jsx";
import Date_ from "./components/Date.jsx";
import Result from "./components/Result.jsx";

function App() {
    return (
        <div className="App">
            {
                //create react components / routes here
            }
            <Header />
            <Router>
                <Switch>
                    <Route path="/city" component={City} />
                    {/* Date is a reserved Word - My VS Code was not happy */}
                    <Route path="/date" component={Date_} />
                    <Route path="/result" component={Result} />
                    <Route exact path="/" component={Europe} />
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
