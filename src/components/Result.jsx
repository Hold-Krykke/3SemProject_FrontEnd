import React, {useEffect, useState} from 'react';
import {Tab, Tabs, Modal, Button, Card, Badge} from 'react-bootstrap';
import Facade from '../apiFacade';
import parseDate from '../utilities';

const Result = ({startDate, endDate, country, city}) => {
	const [data, setData] = useState();
	const [userMessage, setUserMessage] = useState('Loading Events...');

	useEffect(() => {
		Facade.getEvents(startDate, endDate, country, city)
			.then(fetchData => {
				//console.log('fetchData:', fetchData);
				setData(fetchData);
				setUserMessage('');
			})
			.catch(err => {
				if (err.status) {
					err.fullError.then(err => {
						console.log(err);
						if (err.message == 'No events for this City exists') {
							setUserMessage('No events for given city and date found'); //backend error
						} else {
							setUserMessage('Network Error.'); //api error or bug
						}
					});
				} else {
					console.log('Network error');
					setUserMessage('Network Error.');
				}
			});
	}, []);
	return (
		<>
			{userMessage}
			<Modal.Dialog centered>
				{/* {userMessage && (
					<Modal.Header>
						<Modal.Title>{userMessage}</Modal.Title>
					</Modal.Header>
				)} */}
				<Modal.Body>
					<p>Start Date = {parseDate(startDate)}</p>
					<p>End Date = {parseDate(endDate)}</p>
					<p>Country = {country}</p>
					<p>City = {city}</p>
					{/* {data && <ControlledTabs eventData={data} />} */
					/*Enable this if you want only to display tabs on succesful fetch */}
					<ControlledTabs eventData={data} />
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

const ControlledTabs = ({eventData}) => {
	const [key, setKey] = useState('events');
	let listSize = 0;
	if (eventData) listSize = Object.keys(eventData).length;
	return (
		<Tabs id="controlled-tabs" activeKey={key} onSelect={k => setKey(k)}>
			<Tab
				eventKey="events"
				title={
					<span>
						Events <Badge variant="primary">{listSize}</Badge>
					</span>
				}>
				<Events data={eventData} />
			</Tab>
			<Tab eventKey="weather" title="Weather">
				<Weather data={null} /> {/*add actual data from API here*/}
			</Tab>
		</Tabs>
	);
};

const Events = ({data}) => {
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
											<li>
												Event tickets:{' '}
												<a
													href={eventURL}
													target="_blank"
													rel="noopener noreferrer">
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

const Weather = ({data}) => {
	if (!data) {
		return <p>No weather info for this selection.</p>;
	} else if (data.length > 0) {
		return (
			<>
				<Card border="light">
					<Card.Body>
						<Card.Title>Weather Info</Card.Title>
						<Card.Text>
							<p>
								Weather info (Should be returned from API once available):{' '}
								{data}
							</p>
						</Card.Text>
					</Card.Body>
				</Card>
			</>
		);
	}
};

export default Result;
