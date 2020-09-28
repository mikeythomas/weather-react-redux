import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

// Import all weather icons.
const cache = {};
function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}
importAll(require.context('../assets/weather', true, /\.svg$/));
console.log('Icon Cache: ', cache);

// Extracted from amcharts weather app...
const iconToSvg = {
  "01d": "day",
  "01n": "night",
  "02d": "cloudy-day-1",
  "02n": "cloudy-night-1",
  "03d": "cloudy",
  "03n": "cloudy",
  "04d": "rainy-2",
  "04n": "rainy-2",
  "09d": "rainy-3",
  "09n": "rainy-3",
  "10d": "rainy-4",
  "10n": "rainy-4",
  "11d": "thunder",
  "11n": "thunder",
  "13d": "snowy-5",
  "13n": "snowy-5",
  "50d": "cloudy",
  "50n": "cloudy"
};

// TODO: Actually use the weather
function weatherToIcon(weather) {
  // Fallback to React logo if no match is found
  let icon = logo;
  const iconName = iconToSvg[weather.icon];
  if (iconName) {
    const key = ['./', iconName, '.svg'].join('');
    icon = cache[key];
  }

  return icon;
}

function Icon({ className, weather }) {
  const src = weatherToIcon(weather);

  return <img className={className} src={src} alt={weather.main} />
}

export const SmallIcon = styled(Icon)`
  height: 24px;
`;

export const MediumIcon = styled(Icon)`
  height: 48px;
`;

export const HugeIcon = styled(Icon)`
  height: 40vh;
`;
