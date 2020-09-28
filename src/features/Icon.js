import React from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';

// TODO: Actually use the weather
function weatherToIcon(weather) {
  console.log('weatherToIcon ignoring', weather);
  return logo;
}

function Icon({ className, weather }) {
  const src = weatherToIcon(weather);

  return <img className={className} src={src} alt={weather.main} />
}

export const MediumIcon = styled(Icon)`
  height: 48px;
`;

export const HugeIcon = styled(Icon)`
  height: 40vh;
`;
