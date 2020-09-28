import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchForecastById } from '../app/api';
import * as debug from '../app/debug';
import { mockDetail } from '../app/apiMock';

import { Temperature } from './Temperature';
import { MediumIcon, HugeIcon } from './Icons';
import {
  fetchDetailsAsync,
  selectMessage,
  selectDetails,
} from './detailsSlice';

// TODO: Replace with RefreshButton ; switch to styled-components
import refresh from '../assets/refresh-icon.svg';
import styles from './Details.module.css';

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

// Fixed height to reduce jank
const EmptyDetail = styled.div`
  color: gray;
  height: 400px;
`;

export function Details() {
    const message = useSelector(selectMessage);
    const details = useSelector(selectDetails);

    console.log('DETAILS', details);

    if (!details) {
      return (
        <>
          <EmptyDetail>{message || 'Select City For Details'}</EmptyDetail>
        </>
      );
    }

    const today = details.weatherList[0];
    const dayTiles = details.weatherList.map((i, idx) => <DayTile key={idx} info={i} />)

    return (
        <div>
          <div className={styles.rows}>
            <div className={styles.header}>
              <h1 className={styles.headerText}>{details.city}</h1>
              {/* TODO: Have refresh actually refresh */}
              <button className={styles.headerRefresh + ' ' + styles.iconButton}>
                <img src={refresh} className={styles.iconRefresh} alt="refresh" />
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
