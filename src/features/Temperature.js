import React from 'react';

export function Temperature(props) {
  return <span>{Math.round(props.value)} °C</span>
}
