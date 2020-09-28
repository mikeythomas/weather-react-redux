import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    validateByNameAsync,
    debugFillAsync,
    refreshByIdAsync,
    removeCity,
    clear,
    selectError,
    selectCities,
} from './citySlice';
import styled from 'styled-components';

import { Temperature } from './Temperature'
import { CloseButton, RefreshButton } from './Buttons';

const CityDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin: 4px 0;
    border-bottom: 2px solid grey;
`;

const CityText = styled.div`
    flex: auto;
`;

function CityRow({ city }) {
    const dispatch = useDispatch();

    return (
        <CityDiv>
            <CityText>{city.name} - <Temperature value={city.temperature}/> {city.weather.main}</CityText>
            <RefreshButton onClick={() => dispatch(refreshByIdAsync(city.id))} />
            <CloseButton onClick={() => dispatch(removeCity(city))} />
        </CityDiv>
    );
}

// Give the error row fixed height to prevent jank
const ErrorRow = styled.div`
    height: 24px;
`;

export function CityList() {
    const error = useSelector(selectError);
    const cities = useSelector(selectCities);
    const dispatch = useDispatch();
    const [cityName, setCityName] = useState('');

    const stuff = cities.map(c => <CityRow key={c.id} city={c} /> );

    return (
        <div>
            <input type="text" placeholder="Type city name" value={cityName} onChange={e => setCityName(e.target.value)} />
            <button onClick={() => dispatch(validateByNameAsync(cityName))}>+</button>
            <button onClick={() => dispatch(debugFillAsync())}>Debug Fill</button>
            <ErrorRow>{error}</ErrorRow>
            <div>
                {stuff}
            </div>
            <button onClick={() => dispatch(clear())}>Clear</button>
        </div>
    );
}
