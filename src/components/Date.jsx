import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker.css"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker-cssmodules.css"; // Required for Date Picker to work.
import { Modal, CardDeck, Card, Button, ModalBody } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Text or Formats used multiple places throughout code.
const myDateFormat = "yyyy/MM/dd";
const warningText = "End date can't be before Start date.";
const todayButtonText = "Click me to set date to today.";

/**
 * Make set modalShow to true when you want to show the modal.
 * onClick on city, set modalShow to true and put city on the Single Source of Truth in App.js
 */
const DateSelector = ({ 
  city,
  country,
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate, 
  showDatePicker: modalShow,
  setShowDatePicker: setModalShow
  }) => {
  // Set this on City Element. Make that onClick () => setModalShow(true);

  return (
    <>
      <br />
      <MyModal
        city={city}
        country={country}
        modalShow={modalShow}
        setModalShow={setModalShow}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </>
  );
};

/**
 * Modal.
 */
const MyModal = ({
  city,
  country,
  modalShow,
  setModalShow,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  const onHide = () => setModalShow(false);

  return (
    <Modal
      show={modalShow}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h1>Select Date</h1>
      </Modal.Header>
      <ModalBody>
        <h4>Location: {country} - {city}</h4>
      </ModalBody>
      <DateSelectorContent
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </Modal>
  );
};

/**
 * Content for Modal.
 */
const DateSelectorContent = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  const [warning, setWarning] = useState("");

  return (
    <>
      <CardDeck>
        <Card border="light">
          <Card.Body>
            <Card.Title>Select Start Date</Card.Title>
            <Card.Text>
              {startDate.toString()}
              <MyStartDateSelector
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setWarning={setWarning}
              />
            </Card.Text>
          </Card.Body>
        </Card>
        <Card border="light">
          <Card.Body>
            <Card.Title>Select End Date</Card.Title>
            <Card.Text>
              {endDate.toString()}
              <MyEndDateSelector
                startDate={startDate}
                setEndDate={setEndDate}
                endDate={endDate}
                setWarning={setWarning}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      <br />
      <NextButton warning={warning} />
      <br />
      {/* <BackButton /> It is now a modal, so you just click outside the modal and it is effectively back. */}
    </>
  );
};

/**
 * End Date Selector
 */
const MyEndDateSelector = ({ startDate, setEndDate, endDate, setWarning }) => {
  return (
    <>
      <DatePicker
        selected={endDate}
        onChange={date => {
          setEndDate(date);
          if (startDate > date) {
            setWarning(warningText);
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

/**
 * Start Date Selector
 */
const MyStartDateSelector = ({
  startDate,
  setStartDate,
  endDate,
  setWarning
}) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        /**
         * This onChange method only runs when the date picker component is renderen (of course)
         * This means that a user can pick a bad date, re-render the component and confirm the bad date 
         * since the date check only runs on change (when the user clicks another date) and the date 
         * the user chose last is saved even if the date picker is re-rendered
         * To fix this: Reset date every time the date picker is re-rendered
         */
        onChange={date => {
          setStartDate(date);
          if (endDate < date) {
            setWarning(warningText);
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

// const BackButton = () => {
//   return <a href="#/city">Back Button</a>;
// };

/**
 * If End date is set to before Start date, then don't render the "Next" Button.
 */
const NextButton = ({ warning }) => {
  if (warning === "") {
    return (
      <Button variant="primary" href="#/result">
        See Events
      </Button>
    );
  } else {
    return <>{warningText}</>;
  }
};

export default DateSelector;
