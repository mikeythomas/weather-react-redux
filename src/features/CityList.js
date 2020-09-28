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
import {
    fetchDetailsAsync,
} from './detailsSlice';
import styled from 'styled-components';

import { Temperature } from './Temperature'
import { CloseButton, RefreshButton } from './Buttons';
import { SmallIcon } from './Icons';

const CityDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin: 4px 0;
    border-bottom: 2px solid grey;
`;

const CityText = styled.div`
    flex: auto;
`;

// This is to prevent clicking refresh / remove from propagating to the row
// and refreshing the details
function dispatchWrapper(dispatch, action) {
    return e => {
        console.log(e);
        dispatch(action);
        e.stopPropagation();
    };
}

function CityRow({ city }) {
    const dispatch = useDispatch();

    return (
        <CityDiv onClick={() => dispatch(fetchDetailsAsync(city.id))}>
            <CityText>
                {city.name} - <Temperature value={city.temperature}/> {city.weather.main}
                <SmallIcon weather={city.weather} />
            </CityText>
            <RefreshButton onClick={dispatchWrapper(dispatch, refreshByIdAsync(city.id))} />
            <CloseButton onClick={dispatchWrapper(dispatch, removeCity(city))} />
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
            {/* TODO: Hide */}
            {/* <button onClick={() => dispatch(debugFillAsync())}>Debug Fill</button> */}
            <ErrorRow>{error}</ErrorRow>
            <div>
                {stuff}
            </div>
            <button onClick={() => dispatch(clear())}>Clear</button>
        </div>
    );
}
