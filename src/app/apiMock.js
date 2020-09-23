export const data = [
  {
    id: 1,
    name: "Halifax",
    temperature: 9.81,
    text: "Rain",
  },
  {
    id: 2,
    name: "London",
    temperature: 12.12,
    text: "Cloudy",
  },
  {
    id: 3,
    name: "New York",
    temperature: 4.99,
    text: "Sunny",
  },
];

export function getCurrentByName(cityName) {
  const city = data.filter(c => c.name === cityName);
  if (!city.length) {
    return {success: false, error: "City not found"};
  }
  return {...city[0], success: true};
}

export function getCurrentById(cityId) {
  const city = data.filter(c => c.id === cityId);
  if (!city.length) {
    console.error(`Refresh failed on city id ${cityId}`);
    return {success: false, error: "Unknown error"};
  }
  const freshCity = {...city[0]};
  freshCity.temperature += 20*Math.random() - 10;
  freshCity.success = true;
  return freshCity;
}

export function getForecastById(cityId) {
  throw new Error("Not implemented");
}

const currentFail = {
  "cod": "404",
  "message": "city not found"
};

const currentHalifax = {
  "coord": {
    "lon": -63.57,
    "lat": 44.65
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 9.81,
    "feels_like": 7.14,
    "temp_min": 9.44,
    "temp_max": 10.56,
    "pressure": 1004,
    "humidity": 96
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.58,
    "deg": 41,
    "gust": 9.83
  },
  "rain": {
    "1h": 3.45
  },
  "clouds": {
    "all": 100
  },
  "dt": 1600798966,
  "sys": {
    "type": 3,
    "id": 2019613,
    "country": "CA",
    "sunrise": 1600768914,
    "sunset": 1600812708
  },
  "timezone": -10800,
  "id": 6324729,
  "name": "Halifax",
  "cod": 200
};

const currentLondon = {...currentHalifax};
