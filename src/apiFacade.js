import {eventURL, weatherURL} from './settings.js';
import parseDate from './utilities';

function apiFacade() {

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

	const getWeather = (city, year, month, day) => {
		const payload = `city/${city}/${year}/${month}/${day}`;
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
		getEvents,
		getWeather
	};
}

let returnVal = apiFacade();
export default returnVal;
