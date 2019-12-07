import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { HeaderArrow } from './Icons';
import styles from './HeaderStyles.css';

const Header = () => {
    return (
        <header className="header">
            <Router>
                <Switch>
                    <Route path="/result">
                        <nav className="nav header__nav">
                            <ul>

                                <li className="nav__item">
                                    <a href="#/" className="item__text">Click a Country</a>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <a className="item__text">Click a City</a>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Pick a Date</p>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Result</p>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__logo"></div>
                        {/* <p>
              <a href="#/">Click a Country</a> <HeaderArrow/>{" "}
              <a href="#/city">Click a City</a> <HeaderArrow/> Pick a Date <HeaderArrow/> Result
            </p> */}
                    </Route>
                    <Route path="/city">
                        <nav className="nav header__nav">
                            <ul>

                                <li className="nav__item">
                                    <a href="#/" className="item__text">Click a Country</a>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Click a City</p>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Pick a Date</p>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Result</p>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__logo"></div>
                        {/* <p>
              <a href="#/">Click a Country</a> <HeaderArrow/> Click a City <HeaderArrow/> Pick a Date <HeaderArrow/>
              Result
            </p> */}
                    </Route>
                    <Route exact={true} path="*">
                        <nav className="nav header__nav">
                            <ul>

                                <li className="nav__item">
                                    <p className="item__text">Click a Country</p>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Click a City</p>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Pick a Date</p>
                                    <div className="item__arrow-container">
                                        <HeaderArrow />
                                    </div>
                                </li>

                                <li className="nav__item">
                                    <p className="item__text">Result</p>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__logo"></div>
                        {/* <p>Click a Country <HeaderArrow/> Click a City <HeaderArrow/> Pick a Date <HeaderArrow/> Result</p> */}
                    </Route>
                </Switch>
            </Router>
        </header>
    );
};

export default Header;
