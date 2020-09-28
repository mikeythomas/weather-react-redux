export const mockList = [
  {
    id: 1,
    name: "Halifax",
    temperature: 9.81,
    "weather": {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    },
  },
  {
    id: 2,
    name: "London",
    temperature: 12.12,
    "weather": {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10d"
    },
  },
  {
    id: 3,
    name: "New York",
    temperature: 4.99,
    "weather": {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    },
  },
];

// TODO: Do I need to use city.timezone to adjust list[].dt?
export const mockDetail = {
  "city": "Halifax",
  "weatherList": [
    {
      "timestamp": 1600963200000,
      "temperature": 20.29,
      "pressure": 1008,
      "weather": {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      },
      "windSpeed": 4.85,
      "windDeg": 279
    },
    {
      "timestamp": 1601049600000,
      "temperature": 16.11,
      "pressure": 1019,
      "weather": {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      },
      "windSpeed": 0.32,
      "windDeg": 229
    },
    {
      "timestamp": 1601136000000,
      "temperature": 19.71,
      "pressure": 1020,
      "weather": {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      },
      "windSpeed": 2.62,
      "windDeg": 192
    },
    {
      "timestamp": 1601222400000,
      "temperature": 19.59,
      "pressure": 1019,
      "weather": {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      },
      "windSpeed": 4.95,
      "windDeg": 213
    },
    {
      "timestamp": 1601308800000,
      "temperature": 19.25,
      "pressure": 1019,
      "weather": {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      },
      "windSpeed": 4.95,
      "windDeg": 219
    }
  ]
};
