const API_KEY = 'c51223c219d6aec8cb8c5210449bd859';

/**
 * @param {string} endpoint
 * @param {{[key:string]: any}}} params
 */
function urlHelper(endpoint, params) {
  const url = new URL(`https://api.openweathermap.org/data/2.5/${endpoint}`);
  // Request-specific query params
  Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));
  // Always-used query params
  url.searchParams.append('appid', API_KEY);
  url.searchParams.append('units', 'metric');
  return url;
}

async function fetchAndParse(url, debug = null) {
  debug && console.log(debug, ' => ', url.href);
  const response = await fetch(url);
  // debug && console.log(debug, ' response = ', response);
  const result = await response.json();
  debug && console.log(debug, ' result = ', result);

  // Note: DO NOT USE STRICT EQUALITY as the API appears to sometimes return `cod`
  // as a number, other times a string...
  if (result.cod != 200) {
    throw new Error(result.message);
  }

  return result;
}

async function fetchCurrent(param, debug = null) {
  const url = urlHelper(
    'weather',
    param,
  );

  const result = await fetchAndParse(url, debug);

  const { id, name, weather, main } = result;

  return {
    id,
    name,
    temperature: main.temp,
    weather: weather[0],
  };
}

/**
 *
 * @param {string} cityName
 */
export async function fetchCurrentByName(cityName) {
  return await fetchCurrent({ q: cityName }, 'fetchCurrentByName');
}

/**
 *
 * @param {number} id
 */
export async function fetchCurrentById(cityId) {
  return await fetchCurrent({ id: cityId }, 'fetchCurrentById');
}

/**
 *
 * @param {number} cityId
 */
export async function fetchForecastById(cityId) {
  const url = urlHelper(
    'forecast/daily',
    { id: cityId, cnt: 5 },
  );

  const result = await fetchAndParse(url, 'fetchForecastById');

  const { city, list } = result;

  function transformListItem(item) {
    const { dt, temp, pressure, weather, speed, deg } = item;
    return {
      // Note: Timestamp is in seconds; scaling to milliseconds for use with Date()
      timestamp: dt * 1000,
      temperature: temp.day,
      pressure,
      weather: weather[0],
      windSpeed: speed,
      windDeg: deg,
    };
  }

  return {
    city: city.name,
    id: city.id,
    weatherList: list.map(transformListItem),
  };
}
