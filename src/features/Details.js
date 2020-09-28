import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Temperature } from './Temperature';
import { MediumIcon, HugeIcon } from './Icon';
import {
  validateByNameAsync,
  debugFillAsync,
  refreshByIdAsync,
  removeCity,
  clear,
  selectError,
  selectCities,
} from './citySlice';
// TODO: Replace with refresh icon
import logo from '../assets/refresh-icon.svg';
import styles from './Details.module.css';

import { fetchForecastById } from '../app/api';
import * as debug from '../app/debug';
import { mockDetail } from '../app/apiMock';

const DayTileDiv = styled.div`
  text-align: center;
  margin: 0 32px;
`;

function DayTile(props) {
  const { timestamp, temperature, weather } = props.info;
  const date = new Date(timestamp);

  return (
    <DayTileDiv>
      <div>{date.getDate()}</div>
      <div>{date.toString().slice(0, 3)}</div>
      <MediumIcon weather={weather} />
      <div><Temperature value={temperature} /></div>
    </DayTileDiv>
  );
}

export function Details() {
    const error = useSelector(selectError);
    const cities = useSelector(selectCities);
    const dispatch = useDispatch();
    // TODO: Move from state to Redux
    const initialState = (debug.mockForStyling && mockDetail) || null;
    const [details, setDetails] = useState(initialState);
    const props = details;

    async function testForecast() {
      const result = await fetchForecastById(6324729);
      console.log('FORECAST', result);
    }

    if (!details) {
      return (
        <>
          <div className={styles.empty}>Select City For Details</div>
          <button onClick={testForecast}>TEST FORECAST</button>
        </>
      );
    }

    // const stuff = cities.map(c => <CityRow key={c.id} city={c} /> );
    console.log('PROPS', props);
    const today = props.weatherList[0];
    const dayTiles = props.weatherList.map(i => <DayTile info={i} />)

    return (
        <div>
          <div className={styles.rows}>
            <div className={styles.header}>
              <h1 className={styles.headerText}>{props.city}</h1>
              <button className={styles.headerRefresh + ' ' + styles.iconButton}>
                <img src={logo} className={styles.iconRefresh} alt="refresh" />
              </button>
            </div>

            <div className={styles.detailRow}>
              <HugeIcon weather={today.weather} />
              <div className={styles.detailList}>
                <div><Temperature value={today.temperature}/></div>
                <div>{today.weather.description}</div>
                <div>Wind: {today.windSpeed} m/s, {today.windDeg} deg</div>
                <div>Pressure: {today.pressure} hPa</div>
              </div>
            </div>
          </div>

          <div className={styles.forecastRow}>
            {dayTiles}
          </div>
        </div>
    );
}
