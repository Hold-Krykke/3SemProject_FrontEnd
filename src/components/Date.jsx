import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker.css"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker-cssmodules.css"; // Required for Date Picker to work.

// Text or Formats used multiple places throughout code.
const myDateFormat = "yyyy/MM/dd";
const warningText = "End date can't be before Start date.";
const todayButtonText = "Click me to set date to today.";

/**
 * MAIN
 */
const DateSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [warning, setWarning] = useState("");

  return (
    <>
      start date: {startDate.toString()}
      <br />
      end date: {endDate.toString()}
      <br />
      {warning}
      <br />
      <MyStartDateSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setWarning={setWarning}
      />
      <MyEndDateSelector
        startDate={startDate}
        setEndDate={setEndDate}
        endDate={endDate}
        setWarning={setWarning}
      />
      <br />
      <NextButton warning={warning} />
      <br />
      <BackButton />
    </>
  );
};

const MyEndDateSelector = ({ startDate, setEndDate, endDate, setWarning }) => {
  return (
    <>
      <h3> Pick End Date </h3>
      <DatePicker
        selected={endDate}
        onChange={date => {
          setEndDate(date);
          if (startDate > date) {
            setWarning(warningText);
            // TODO DISABLE SUBMIT BUTTON HERE IN THE IF STATEMENT.
          } else {
            setWarning("");
          }
        }}
        inline
        showWeekNumbers
        showMonthDropdown
        showYearDropdown
        selectsEnd
        dropdownMode="select"
        endDate={endDate}
        minDate={startDate}
        dateFormat={myDateFormat}
        todayButton={todayButtonText}
      />
    </>
  );
};

const MyStartDateSelector = ({
  startDate,
  setStartDate,
  endDate,
  setWarning
}) => {
  return (
    <>
      <h3> Pick Start Date </h3>
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          if (endDate < date) {
            setWarning(warningText);
            // TODO DISABLE SUBMIT BUTTON HERE IN THE IF STATEMENT.
          } else {
            setWarning("");
          }
        }}
        inline
        showWeekNumbers
        showMonthDropdown
        showYearDropdown
        selectsStart
        dropdownMode="select"
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        dateFormat={myDateFormat}
        todayButton={todayButtonText}
      />
    </>
  );
};

const BackButton = () => {
  return <a href="#/city">Back Button</a>;
};

/**
 * If End date is set to before Start date, then don't render the "Next" Button.
 */
const NextButton = ({ warning }) => {
  if (warning === "") {
    return <a href="#/result">See Events</a>;
  } else {
    return <>{warningText}</>;
  }
};

export default DateSelector;
