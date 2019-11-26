import { onlineURL } from "./settings.js";

const parseDate = date => {
  let month = date.getMonth();
  month = month + 1;
  return "" + date.getFullYear() + "-" + month + "-" + date.getDate();
};

function apiFacade() {
  const getCountryNameByAlpha2 = alpha2 => {
    return fetch(onlineURL + "countryname/" + alpha2).then(handleHttpErrors);
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

    return fetch(onlineURL + payload).then(handleHttpErrors);
  };

  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

  function makeOptions(method, body) {
    var opts = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
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
    getEvents
  };
}

let returnVal = apiFacade();
export default returnVal;
