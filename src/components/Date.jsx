import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Required for Date Picker to work.
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker-cssmodules.css"; // Required for Date Picker to work.

const myDateFormat = "dd/MM/yyyy";

/**
 * MAIN
 */
const DateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      start date: {startDate.toString()}
      <br />
      end date: {endDate.toString()}
      <br />
      <MyStartDateSelector
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
      />
      <br />
      <myEndDateSelector
        startDate={startDate}
        setEndDate={setEndDate}
        endDate={endDate}
      />
      <br></br>
      <BackButton />
    </>
  );
};

const myEndDateSelector = ({ startDate, setEndDate, endDate }) => {
  return (
    <>
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        inline
        showWeekNumbers
        showMonthDropdown
        showYearDropdown
        selectsEnd
        endDate={endDate}
        minDate={startDate}
        dateFormat={myDateFormat}
        todayButton="Click me to set date to today."
      />
    </>
  );
};

const MyStartDateSelector = ({ startDate, setStartDate, endDate }) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
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
