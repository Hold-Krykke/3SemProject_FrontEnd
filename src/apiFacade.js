import {eventURL, weatherURL} from './settings.js';
import parseDate from './utilities';

function apiFacade() {
	const getCountryNameByAlpha2 = alpha2 => {
		return fetch(eventURL + 'countryname/' + alpha2).then(handleHttpErrors);
	};

	// Example URL from test
	// ?startdate=2019-12-24&enddate=2020-12-24&country=Norway&city=Oslo
	/**
	 * Get Events.
	 * @param {Date} startDate
	 * @param {Date} endDate
	 * @param {String} country
	 * @param {String} city
	 */
	const getEvents = (startDate, endDate, country, city) => {
		const start = parseDate(startDate);
		const end = parseDate(endDate);

		const payload = `events?startdate=${start}&enddate=${end}&country=${country}&city=${city}`;

		return fetch(eventURL + payload).then(handleHttpErrors);
	};

	const getWeather = (city, startDate, endDate) => {
		startDate = parseDate(startDate);
		endDate = parseDate(endDate);
		let payload;
		if (startDate === endDate) {
			//Dates are equal and we only need to look at one of them, and the specific endpoint
			//get weather for the whole day
			let dateArray = startDate.split('-'); //yyyy-mm-dd format, so [0] is year, and so on
			let year = dateArray[0];
			let month = dateArray[1];
			let day = dateArray[2];
			payload = `city/${city}/${year}/${month}/${day}`;
		} else {
			//Dates are not equal and we get weather for the next 5 days (to get a gist. We have limited weather data)
			payload = `city/${city}/`;
		}
		return fetch(weatherURL + payload).then(handleHttpErrors);
	};

	function handleHttpErrors(res) {
		if (!res.ok) {
			return Promise.reject({status: res.status, fullError: res.json()});
		}
		return res.json();
	}

	function makeOptions(method, body) {
		var opts = {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-type': 'application/json'
			}
		};
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	}

	return {
		// Remember all statements below are a shortcut for this version:
		// getSomething: getSomething
		// newmethodname: actualMethod
		getCountryNameByAlpha2,
		getEvents,
		getWeather
	};
}

let returnVal = apiFacade();
export default returnVal;
