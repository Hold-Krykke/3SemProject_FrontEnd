import React, {useEffect, useState} from 'react';
import {Tab, Tabs, Modal, Button, Card, Badge} from 'react-bootstrap';
import Facade from '../apiFacade';
import parseDate from '../utilities';

const Result = ({startDate, endDate, country, city, setClearCities}) => {
	const [eventData, setEventData] = useState();
	const [userMessage, setUserMessage] = useState();
	const [weatherData, setWeatherData] = useState();

	//For events
	useEffect(() => {
		setUserMessage('Loading data...');
		Facade.getEvents(startDate, endDate, country, city)
			.then(fetchData => {
				//console.log('fetchData:', fetchData);
				setEventData(fetchData);
				setUserMessage();
			})
			.catch(err => {
				console.log(err);
				if (err.status) {
					err.fullError.then(err => {
						if (err.message) {
							setUserMessage(userMessage => ({
								...userMessage,
								...(
									//backend error
									<span>
										We had trouble loading event data:
										<br />
										{err.message}
										<br />
									</span>
								)
							}));
						}
					});
				} else {
					console.log('Network error #1');
					setUserMessage(userMessage => [
						{...userMessage},
						<span>
							We had trouble loading event data:
							<br />
							Network Error.(Error code #1)
						</span>
					]);
				}
			});
	}, []);

	//For weather
	useEffect(() => {
		Facade.getWeather(city, startDate, endDate)
			.then(fetchData => {
				setWeatherData(fetchData);
			})
			.catch(err => {
				console.log(err);
				if (err.status) {
					err.fullError.then(err => {
						if (err.message) {
							setUserMessage(userMessage => [
								{...userMessage},
								<span>
									We had trouble loading weather data:
									<br />
									{err.message}
								</span>
							]);
						}
					});
				} else {
					console.log('Network error #2');
					setUserMessage(userMessage => [
						{...userMessage},
						<span>
							We had trouble loading weather data:
							<br />
							Network Error.(Error code #2)
						</span>
					]);
				}
			});
	}, []);

	return (
		<>
			{<div>{userMessage}</div>}
			<Modal.Dialog centered>
				<Modal.Body>
					<p>Start Date = {parseDate(startDate)}</p>
					<p>End Date = {parseDate(endDate)}</p>
					<p>Country = {country}</p>
					<p>City = {city}</p>
					<ControlledTabs
						eventData={eventData}
						weatherData={weatherData}
						startDate={startDate}
						endDate={endDate}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={() => {setClearCities(true); window.history.back()}}>
						Go back
					</Button>
				</Modal.Footer>
			</Modal.Dialog>
		</>
	);
};

const ControlledTabs = ({eventData, weatherData, startDate, endDate}) => {
	const [key, setKey] = useState('events');
	let listSize = 0;
	if (eventData) listSize = Object.keys(eventData).length;
	return (
		<Tabs
			id="controlled-tabs"
			activeKey={key}
			onSelect={k => {
				setKey(k);
			}}>
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
				<Weather data={weatherData} startDate={startDate} endDate={endDate} />
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
										<h3>event object data</h3>
										<h4>{eventName}</h4>
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

const Weather = ({data, startDate, endDate}) => {
	//console.log('WeatherDataInWeatherComponent: ', data);
	const weatherHeader =
		JSON.stringify(startDate) != JSON.stringify(endDate)
			? 'Weather info for the next 5 days'
			: 'Weather for the chosen day';
	if (!data) {
		return <p>No weather info available for this selection.</p>;
	} else if (data.length > 0) {
		return (
			<>
				<Card border="light">
					<Card.Body>
						<Card.Title>{weatherHeader}</Card.Title>
						<Card.Text>
							{data.map(
								({
									dateTime,
									funnyAdvice,
									humidity,
									predictability,
									temp,
									weatherIcon,
									weatherStatus,
									windDirection,
									windSpeed
								}) => (
									<>
										<h3>weather object data</h3>
										<ul>
											<li>dateTime: {dateTime}</li>
											<li>funnyAdvice: {funnyAdvice}</li>
											<li>humidity: {humidity}</li>
											<li>predictability: {predictability}</li>
											<li>temp: {temp}</li>
											<li>
												weatherIcon:{' '}
												<img src={weatherIcon} height="25" width="25"></img>
											</li>
											<li>weatherStatus: {weatherStatus}</li>
											<li>windDirection: {windDirection}</li>
											<li>windSpeed: {windSpeed}</li>
										</ul>
									</>
								)
							)}
						</Card.Text>
					</Card.Body>
				</Card>
			</>
		);
	}
	return null; //TODO REMOVE if needed (errorthrowing)
};
export default Result;
