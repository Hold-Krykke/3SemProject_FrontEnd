import React from "react";

const Result = ({ startDate, endDate }) => {
  return (
    <>
      <h1>RESULT COMPONENT HERE</h1>
      <p>
        Start Date = <ParseDate date={startDate} />
      </p>
      <p>
        End Date = <ParseDate date={endDate} />
      </p>
      <a href="#/date">Back Button</a>
    </>
  );
};

const ParseDate = ({ date }) => {
  let month = date.getMonth();
  month = month + 1;
  return "" + date.getFullYear() + "-" + month + "-" + date.getDate();
};

export default Result;
