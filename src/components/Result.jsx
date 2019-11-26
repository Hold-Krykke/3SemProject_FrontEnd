import React, {useEffect, useState} from 'react';
import {Tab, Tabs, Modal, Button, Card, Badge} from 'react-bootstrap';
import Facade from '../apiFacade';

const Result = ({startDate, endDate, country, city}) => {
	const [data, setData] = useState();
	const [userMessage, setUserMessage] = useState('Loading Events...');

	useEffect(() => {
		Facade.getEvents(startDate, endDate, country, city)
			.then(fetchData => {
				console.log('fetchData:', fetchData);
				setData(fetchData);
				setUserMessage('');
			})
			.catch(err => {
				if (err.status) {
					err.fullError.then(err => {
						console.log(err);
						setUserMessage('No events for given city and date found');
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
					<p>
						Start Date = <ParseDate date={startDate} />
					</p>
					<p>
						End Date = <ParseDate date={endDate} />
					</p>
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

const ParseDate = ({date}) => {
	let month = date.getMonth();
	month = month + 1;
	return '' + date.getFullYear() + '-' + month + '-' + date.getDate();
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
				<Weather data={'WeatherData'} />
			</Tab>
			<Tab eventKey="clothes" title="Clothes">
				<Clothing data={'ClothingData'} />
			</Tab>
		</Tabs>
	);
};

const Events = ({data}) => {
	//console.log('data ', data[0]);
	//console.log('url ', data[0].eventURL);
	if (!data) {
		return <p>No events for this selection.</p>;
	} else if (data.length > 0) {
		return (
			<>
				<Card border="light">
					<Card.Body>
						<Card.Title>Weather Info</Card.Title>
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
	return (
		<>
			<Card border="light">
				<Card.Body>
					<Card.Title>Weather Info</Card.Title>
					<Card.Text>
						<p>
							Weather info (Should be returned from API once available): {data}
						</p>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

const Clothing = ({data}) => {
	return (
		<>
			<Card border="light">
				<Card.Body>
					<Card.Title>Clothes info</Card.Title>
					<Card.Text>
						<p>
							Clothes info (Should be returned from API once available): {data}
						</p>
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default Result;
