import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Required for Date Picker to work.
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker-cssmodules.css"; // Required for Date Picker to work.

const myDateFormat = "yyyy/MM/dd";
const warning = "End Date is set before Start Date.";

/**
 * MAIN
 */
const DateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
      <br></br>
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
            setWarning(warning);
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
        todayButton="Click me to set date to today."
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
            setWarning(warning);
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
        todayButton="Click me to set date to today."
      />
    </>
  );
};

const BackButton = () => {
  return <a href="#/city">Back Button</a>;
};

export default DateSelector;
