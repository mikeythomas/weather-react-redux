import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    validateByNameAsync,
    refreshByIdAsync,
    removeCity,
    selectError,
    selectCities,
} from './citySlice';

function CityRow(props) {
    const dispatch = useDispatch();

    return (
        <div>
            <div>{props.city.name} - {Math.round(props.city.temperature)} °C {props.city.text}</div>
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
            <input type="text" value={cityName} onChange={e => setCityName(e.target.value)} />
            <button onClick={() => dispatch(validateByNameAsync(cityName))}>+</button>
            <div>{error}</div>
            <div>
                {stuff}
            </div>
        </div>
    );
}
