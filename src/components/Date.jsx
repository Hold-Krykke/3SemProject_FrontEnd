import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker.css"; // Required for Date Picker to work.
import "react-datepicker/dist/react-datepicker-cssmodules.css"; // Required for Date Picker to work.
import { Modal, CardDeck, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Text or Formats used multiple places throughout code.
const myDateFormat = "yyyy/MM/dd";
const warningText = "End date can't be before Start date.";
const todayButtonText = "Click me to set date to today.";

/**
 * Make set modalShow to true when you want to show the modal.
 * onClick on city, set modalShow to true and put city on the Single Source of Truth in App.js
 */
const DateSelector = ({ startDate, setStartDate, endDate, setEndDate }) => {
  // Set this on City Element. Make that onClick () => setModalShow(true);
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <br />
      {/* Remove this button when you make onClick city setModalShow(true) */}
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Click me to open Modal
      </Button>
      <br />
      <MyModal
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
      <Modal.Header>
        <h1 className="modalHeader">Select Date</h1>
      </Modal.Header>
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
            {/* <Card.Title>Select Start Date</Card.Title> */}
            <Card.Text>
              <MyDateSelector
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setWarning={setWarning}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      {/*<br />
      <NextButton warning={warning} />
      <br />
      <BackButton /> It is now a modal, so you just click outside the modal and it is effectively back. */}
    </>
  );
};

/**
 * Date Selector
 */
const MyDateSelector = ({
  startDate,
  setStartDate,
  endDate,
  setWarning
}) => {
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          if (endDate < date) {
            setWarning(warningText);
          } else {
            setWarning("");
          }
        }}
        inline
        selectsStart
        dropdownMode="select"
        minDate={new Date()}
        startDate={startDate}
        endDate={endDate}
        dateFormat={myDateFormat}
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
