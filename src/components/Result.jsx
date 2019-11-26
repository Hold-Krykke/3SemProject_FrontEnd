import React, { useEffect, useState } from "react";
import Facade from "../apiFacade";

const Result = ({ startDate, endDate, country, city }) => {
  const [data, setData] = useState([{}]);
  const [userMessage, setUserMessage] = useState("Loading Events...");

  useEffect(() => {
    Facade.getEvents(startDate, endDate, country, city)
      .then(d => {
        setData(d);
        setUserMessage("");
        // console.log(JSON.stringify(d)); // TODO DELETE this console.log - Was Used for testing Purposes
        // console.log("d length = " + d.length);
        // console.log("data length = " + data.length);
        // console.log(data);
      })
      .catch(err => {
        if (err.status) {
          err.fullError.then(err => {
            console.log(err);
            setUserMessage(err.message);
          });
        } else {
          console.log("Network error");
          setUserMessage("Network Error.");
        }
      });
  }, []);

  return (
    <>
      <h1>RESULT COMPONENT HERE</h1>
      <p>{userMessage}</p>
      <PrintEvents data={data} />
      <p>
        Start Date = <ParseDate date={startDate} />
      </p>
      <p>
        End Date = <ParseDate date={endDate} />
      </p>
      <p>Country = {country}</p>
      <p>City = {city}</p>
      <a href="#/date">Back Button</a>
    </>
  );
};

const PrintEvents = ({ data }) => {
  if (data.length > 0) {
    return (
      <>
        {data.map(
          ({
            eventAddress,
            eventDate,
            eventName,
            eventURL,
            latitude,
            longitude
          }) => (
            <>
              <h3>{eventName}</h3>
              <ul key={eventURL}>
                <li>Event Address: {eventAddress}</li>
                <li>Event Date: {eventDate}</li>
              </ul>
            </>
          )
        )}
      </>
    );
  } else {
    return "Something went wrong.";
  }
};

const ParseDate = ({ date }) => {
  let month = date.getMonth();
  month = month + 1;
  return "" + date.getFullYear() + "-" + month + "-" + date.getDate();
};

export default Result;
