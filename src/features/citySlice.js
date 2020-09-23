import { createSlice } from '@reduxjs/toolkit';
import {
  data,
  getCurrentByName,
  getCurrentById,
} from '../app/apiMock';

const MAX_CITIES = 8;

export const citySlice = createSlice({
  name: 'city',
  initialState: {
      list: data,
      error: "",
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    addCity: (state, action) => {
      const city = action.payload;
      state.list = [city, ...state.list].slice(0, MAX_CITIES)
    },
    removeCity: (state, action) => {
      const city = action.payload;
      console.log('removeCity', city, state.list.map(c => c.id), state.list.map(c => c === city));
      // state.list = state.list.filter(c => c === city);
    },
  },
});

export const { addCity, removeCity } = citySlice.actions;

const { setError } = citySlice.actions;

export const validateByNameAsync = cityName => dispatch => {
  console.log(`Validating city name '${cityName}'`);
  setTimeout(() => {
    const result = getCurrentByName(cityName);
    console.log('validateByNameAsync result = ', result);
    if (result.success) {
      dispatch(addCity(result));
    } else {
      dispatch(setError(result.error));
    }
  }, 1000);
};

export const refreshByIdAsync = cityId => dispatch => {
  console.log('Refreshing city id = ', cityId);
  setTimeout(() => {
    const result = getCurrentById(cityId);
    console.log('refreshByIdAsync result = ', result);
    // dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectError = state => state.city.error;
export const selectCities = state => state.city.list;

export default citySlice.reducer;
