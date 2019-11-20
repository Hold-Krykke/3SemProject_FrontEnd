import { localURL } from "./settings.js";

function apiFacade() {

  const getCountryNameByAlpha2 = (alpha2) => {
    return fetch(localURL + "countryname/" + alpha2).then(handleHttpErrors);
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
    getCountryNameByAlpha2
  };
}

let returnVal = apiFacade();
export default returnVal;
