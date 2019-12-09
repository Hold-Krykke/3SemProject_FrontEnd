import React, {useState} from 'react';
import DatePicker from 'react-datepicker'; // Required for Date Picker to work.
import {
	Modal,
	CardDeck,
	Card,
	Button,
	ModalBody,
	ModalFooter
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './DateStyles.css';

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
			centered>
			<Modal.Header>
				<h1 className="modalHeader">Select Date</h1>
			</Modal.Header>
			<ModalBody>
				<h4>
					Location: {country} - {city}
				</h4>
			</ModalBody>
			<DateSelectorContent
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
			/>
			<button
				className="dateButton"
				onClick={() => {
					if (endDate === undefined) {
						setEndDate(startDate);
					}
					window.location = '#/result';
				}}>
				See Events
			</button>
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
	const [warning, setWarning] = useState('');

	return (
		<>
			<CardDeck>
				<Card border="light">
					<Card.Body>
						<MyDateSelector
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
							setWarning={setWarning}
						/>
					</Card.Body>
				</Card>
			</CardDeck>
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
	setEndDate,
	setWarning
}) => {
	const [selectionComplete, toggleSelectionComplete] = useState(false);

	const handleDateChange = date => {
		if (!startDate) {
			setStartDate(date);
			return;
		}

		if (startDate && !endDate) {
			setEndDate(date);
			return;
		}

		if (startDate && endDate) {
			setStartDate(date);
			setEndDate(undefined);
			return;
		}
	};

	return (
		<>
			<DatePicker
				selected={startDate}
				onChange={handleDateChange}
				// onSelect={handleSelect}
				selectsEnd={Boolean(startDate)}
				startDate={startDate}
				endDate={endDate}
				inline
			/>
		</>
	);
};

export default DateSelector;
