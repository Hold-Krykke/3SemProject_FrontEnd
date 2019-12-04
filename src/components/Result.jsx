import React, { useEffect, useState } from "react";
import { Tab, Tabs, Modal, Button, Card, Badge } from "react-bootstrap";
import Facade from "../apiFacade";
import parseDate from "../utilities";

const Result = ({ startDate, endDate, country, city }) => {
  const [eventData, setEventData] = useState();
  const [weatherData, setWeatherData] = useState([]);
  const [userMessage, setUserMessage] = useState("Loading Events...");

  //For events
  useEffect(() => {
    Facade.getEvents(startDate, endDate, country, city)
      .then(fetchData => {
        //console.log('fetchData:', fetchData);
        setEventData(fetchData);
        setUserMessage("");
      })
      .catch(err => {
        if (err.status) {
          err.fullError.then(err => {
            console.log(err);
            if (err.message == "No events for this City exists") {
              setUserMessage("No events for given city and date found"); //backend error
            } else {
              setUserMessage("Network Error."); //uncaught api error or bug
            }
          });
        } else {
          console.log("Network error");
          setUserMessage("Network Error.");
        }
      });
  }, []);

  //For weather
  useEffect(() => {
    if (!eventData) {
      setUserMessage("Event didn't load correctly");
      return;
    }
    setWeatherData([]);
    let previousDateArray = [];
    let fetchedData = [];
    for (const event in eventData) {
      if (eventData.hasOwnProperty(event)) {
        const element = eventData[event];
        let dateArray = element.eventDate.split("-"); //yyyy-mm-dd format, so [0] is year, and so on
        if (JSON.stringify(dateArray) == JSON.stringify(previousDateArray)) continue;
        previousDateArray = dateArray;
        Facade.getWeather(city, dateArray[0], dateArray[1], dateArray[2])
          .then(fetchData => {
            setWeatherData([...fetchedData, fetchData[0]]);
            fetchedData = [...fetchedData, fetchData[0]];
            //always returns array with 1 field
            // else //need some error handling, as there are cases that return an empty array. (?)
            // 	setWeatherData([
            // 		...weatherData,
            // 		{noData: `No data available for${element.eventData}`}
            // 	]);
          })
          .catch(err => {
            console.log(err);
            if (err.status) {
              err.fullError.then(err => {
                console.log(err);
                if (err.message == "No events for this City exists") {
                  setUserMessage("No events for given city and date found"); //HERE it should be 'some dates didn't return weather data' && check on all possible err.messages
                } else {
                  setUserMessage("Network Error. (Error code #1)"); //uncaught api error or bug
                }
              });
            } else {
              console.log("Network error");
              setUserMessage("Network Error. (Error code #2)");
            }
          });
        //setWeatherData([...fetchedData]); Should set state here instead of inside loop to avoid re-rendering weather component too many times
      }
    }
  }, [eventData]);

  return (
    <>
      {userMessage}
      <Modal.Dialog centered>
        <Modal.Body>
          <p>Start Date = {parseDate(startDate)}</p>
          <p>End Date = {parseDate(endDate)}</p>
          <p>Country = {country}</p>
          <p>City = {city}</p>
          <ControlledTabs eventData={eventData} weatherData={weatherData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go back
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

const ControlledTabs = ({ eventData, weatherData }) => {
  const [key, setKey] = useState("events");
  let listSize = 0;
  if (eventData) listSize = Object.keys(eventData).length;
  return (
    <Tabs
      id="controlled-tabs"
      activeKey={key}
      onSelect={k => {
        setKey(k);
      }}
    >
      <Tab
        eventKey="events"
        title={
          <span>
            Events <Badge variant="primary">{listSize}</Badge>
          </span>
        }
      >
        <Events data={eventData} />
      </Tab>
      <Tab eventKey="weather" title="Weather">
        <Weather data={weatherData} />
      </Tab>
    </Tabs>
  );
};

const Events = ({ data }) => {
  let keyCounter = 0;
  if (!data) {
    return <p>No events for this selection.</p>;
  } else if (data.length > 0) {
    return (
      <>
        <Card border="light">
          <Card.Body>
            <Card.Title>Event info</Card.Title>
            <Card.Text>
              {data.map(
                (
                  {
                    eventAddress,
                    eventDate,
                    eventName,
                    eventURL,
                    latitude,
                    longitude
                  },
                  index
                ) => (
                  <>
                    <h3>event object data</h3>
                    <h4>{eventName}</h4>
                    <ul key={eventURL}>
                      <li>Event Address: {eventAddress}</li>
                      <li>Event Date: {eventDate}</li>
                      <li>
                        Event tickets:{" "}
                        <a
                          href={eventURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Purchase tickets
                        </a>
                      </li>
                    </ul>
                  </>
                )
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return <p>No events found.</p>;
  }
};

const Weather = ({ data }) => {
  //console.log('WeatherDataInWeatherComponent: ', data);
  console.log("Weather component did mount");
  if (!data) {
    return <p>No weather info available for this selection.</p>;
  } else if (data.length > 0) {
    return (
      <>
        <Card border="light">
          <Card.Body>
            <Card.Title>Weather Info</Card.Title>
            <Card.Text>
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
                  windSpeed,
                  noData
                }) => (
                  <>
                    <h3>weather object data</h3>
                    <ul>
                      <li>dateTime: {dateTime}</li>
                      <li>funnyAdvice: {funnyAdvice}</li>
                      <li>humidity: {humidity}</li>
                      <li>predictability: {predictability}</li>
                      <li>temp: {temp}</li>
                      <li>
                        weatherIcon:{" "}
                        <img src={weatherIcon} height="25" width="25"></img>
                      </li>
                      <li>weatherStatus: {weatherStatus}</li>
                      <li>windDirection: {windDirection}</li>
                      <li>windSpeed: {windSpeed}</li>
                      {noData && <li>noData: {noData}</li>}
                    </ul>
                  </>
                )
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
  return null; //TODO REMOVE if needed (errorthrowing)
};
export default Result;
