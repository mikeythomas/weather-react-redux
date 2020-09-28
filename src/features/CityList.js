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
import { Temperature } from './Temperature'

function CityRow(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>{props.city.name} - <Temperature value={props.city.temperature} /></div>
            <button onClick={() => dispatch(refreshByIdAsync(props.city.id))}>R</button>
            <button onClick={() => dispatch(removeCity(props.city))}>X</button>
        </div>
    );
}

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
            <div>{error}</div>
            <div>
                {stuff}
            </div>
            <button onClick={() => dispatch(clear())}>Clear</button>
        </div>
    );
}
