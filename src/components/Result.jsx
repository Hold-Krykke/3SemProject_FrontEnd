import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Modal, Button, Card, Badge } from 'react-bootstrap';
import Facade from '../apiFacade';
import parseDate from '../utilities';
import styles from './ResultStyles.css'
import { DateIcon, LocationIcon } from './Icons'

const Result = ({ startDate, endDate, country, city, setClearCities }) => {
    const [eventData, setEventData] = useState();
    const [weatherData, setWeatherData] = useState();
    const [userMessage, setUserMessage] = useState();

    //For events
    useEffect(() => {
        setUserMessage('Loading data...');
        Facade.getEvents(startDate, endDate, country, city)
            .then(fetchData => {
                //console.log('fetchData:', fetchData);
                setEventData(fetchData);
                setUserMessage();
            })
            .catch(err => {
                console.log(err);
                if (err.status) {
                    err.fullError.then(err => {
                        if (err.message) {
                            setUserMessage(userMessage => ({
                                ...userMessage,
                                ...(
                                    //backend error
                                    <span>
                                        We had trouble loading event data:
										<br />
                                        {err.message}
                                        <br />
                                    </span>
                                )
                            }));
                        }
                    });
                } else {
                    console.log('Network error #1');
                    setUserMessage(userMessage => [
                        { ...userMessage },
                        <span>
                            We had trouble loading event data:
							<br />
                            Network Error.(Error code #1)
						</span>
                    ]);
                }
            });
    }, []);

    //For weather
    useEffect(() => {
        Facade.getWeather(city, startDate, endDate)
            .then(fetchData => {
                setWeatherData(fetchData);
            })
            .catch(err => {
                console.log(err);
                if (err.status) {
                    err.fullError.then(err => {
                        if (err.message) {
                            setUserMessage(userMessage => [
                                { ...userMessage },
                                <span>
                                    We had trouble loading weather data:
									<br />
                                    {err.message}
                                </span>
                            ]);
                        }
                    });
                } else {
                    console.log('Network error #2');
                    setUserMessage(userMessage => [
                        { ...userMessage },
                        <span>
                            We had trouble loading weather data:
							<br />
                            Network Error.(Error code #2)
						</span>
                    ]);
                }
            });
    }, []);

    return (
        <div className="result">
            {<div>{userMessage}</div>}
            <Modal.Dialog centered>
                <Modal.Body>
                    <div className="country-data-info">
                        <p>Events in &#160;</p>
                        <p>{city},&#160;</p>
                        <p>{country} on &#160;</p>
                        <p>{parseDate(startDate)}&#160;-&#160;</p>
                        <p>{parseDate(endDate)}</p>
                    </div>
                    <ControlledTabs
                        eventData={eventData}
                        weatherData={weatherData}
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="backButton" onClick={() => { setClearCities(true); window.history.back() }}>
                        Go back
					</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

const ControlledTabs = ({ eventData, weatherData, startDate, endDate }) => {
    const [key, setKey] = useState('events');
    let listSize = 0;
    if (eventData) listSize = Object.keys(eventData).length;
    return (
        <Tabs
            id="controlled-tabs"
            activeKey={key}
            onSelect={k => {
                setKey(k);
            }}>
            <Tab
                eventKey="events"
                title={
                    <span>
                        Events <Badge variant="primary">{listSize}</Badge>
                    </span>
                }>
                <Events data={eventData} />
            </Tab>
            <Tab eventKey="weather" title="Weather">
                <Weather data={weatherData} startDate={startDate} endDate={endDate} />
            </Tab>
        </Tabs>
    );
};

const Events = ({ data }) => {
    if (!data) {
        return <p>No events for this selection.</p>;
    } else if (data.length > 0) {
        return (
            <>
                <Card border="light">
                    <Card.Body>
                        {/* <Card.Title>Event info</Card.Title> */}
                        <div className="card-text">
                            {data.map(
                                ({
                                    eventAddress,
                                    eventDate,
                                    eventName,
                                    eventURL,
                                    latitude,
                                    longitude
                                }, i) => (
                                        <div key={i} className="event__item">
                                            <div className="item__left-side">
                                                <h4 className="item__name">{eventName}</h4>
                                                <div className="item__date">
                                                    <DateIcon />
                                                    <p>{eventDate}</p>
                                                </div>
                                            </div>

                                            <div className="item__right-side">
                                                <div className="item__location"><LocationIcon /><p className="location__text">{eventAddress}</p></div>
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        return <p>No events found.</p>;
    }
};

const Weather = ({ data, startDate, endDate }) => {
    //console.log('WeatherDataInWeatherComponent: ', data);
    const weatherHeader =
        JSON.stringify(startDate) != JSON.stringify(endDate)
            ? 'Weather info for the next 5 days'
            : 'Weather for the chosen day';
    if (!data) {
        return <p>No weather info available for this selection.</p>;
    } else if (data.length > 0) {
        return (
            <>
                <Card border="light">
                    <Card.Body>
                        <div className="card-text">
                            {data.map(
                                ({
                                    dateTime,
                                    funnyAdvice,
                                    humidity,
                                    predictability,
                                    temp,
                                    weatherIcon,
                                    weatherStatus,
                                    windDirection,
                                    windSpeed
                                }, i) => (
                                        <div key={i} className="weather__item">

                                            <div className="item__left-side">
                                                <p className="item__time">{dateTime}</p>
                                                <p className="item__temp">{temp}&#8451;</p>
                                            </div>

                                            <div className="item__right-side">
                                                <p>{funnyAdvice}</p>
                                                <div className="item__status">
                                                    <p>{weatherStatus}</p>
                                                    <p className="weather__icon">{' '}<img src={weatherIcon} height="25" width="25"></img></p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
    return null; //TODO REMOVE if needed (errorthrowing)
};
export default Result;
