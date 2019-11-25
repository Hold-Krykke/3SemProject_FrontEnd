import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Required for Date Picker to work.
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker-cssmodules.css"; // Required for Date Picker to work.

/**
 * MAIN
 */
const DateSelector = () => {
  return (
    <>
      <MyDateSelector />

      <br></br>
      <BackButton />
    </>
  );
};

const MyDateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        inline
      />
    </>
  );
};

const BackButton = () => {
  return <a href="#/city">Back Button</a>;
};

export default DateSelector;
