import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  fetchDetailsAsync,
  selectMessage,
  selectDetails,
} from './detailsSlice';

import { Temperature } from './Temperature';
import { MediumIcon, HugeIcon } from './Icons';
import { RefreshButton } from './Buttons';

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
  height: 500px;
`;

const DetailDiv = styled.div`
  height: 500px;
`;

export function Details() {
    const message = useSelector(selectMessage);
    const details = useSelector(selectDetails);
    const dispatch = useDispatch();

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
        <DetailDiv>
          <div className={styles.rows}>
            <div className={styles.header}>
              <h1 className={styles.headerText}>{details.city}</h1>
              <RefreshButton onClick={() => dispatch(fetchDetailsAsync(details.id))} height="32px" />
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
        </DetailDiv>
    );
}
