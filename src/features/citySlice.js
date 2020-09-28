import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentByName,
  fetchCurrentById,
  fetchForecastById,
} from '../app/api';
import * as debug from '../app/debug'
import { mockList } from '../app/apiMock';

const DEBUG = true;
const MAX_CITIES = 8;

export const citySlice = createSlice({
  name: 'city',
  initialState: {
      list: (debug.mockForStyling && mockList) || [],
      error: "",
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = '';
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
    updateCity: (state, action) => {
      const city = action.payload;
      console.log('updateCity', state.list.indexOf(city), state.list);
    },
    clear: (state, action) => {
      state.list = [];
    }
  },
});

// Externally used actions
export const { addCity, removeCity, clear } = citySlice.actions;
// Interally used actions (thunk dispatches)
const { updateCity, setError, clearError } = citySlice.actions;

// Thunks for async actions
export const validateByNameAsync = cityName => async dispatch => {
  console.log(`validateByNameAsync '${cityName}'`);

  try {
    const result = await fetchCurrentByName(cityName);
    console.log('validateByNameAsync result = ', result);
    dispatch(addCity(result));
    dispatch(clearError());
  } catch (err) {
    console.error(err);
    dispatch(setError(err.message || 'Unknown error occurred'));
  }
};

export const debugFillAsync = () => async dispatch => {
  // NOTE: Order isn't guaranteed due to async...
  ['Bedford', 'Sackville', 'London', 'New York', 'Chennai', 'Tokyo', 'Brazil'].forEach(name => {
    console.log('Auto-fill: ', name)
    dispatch(validateByNameAsync(name));
  });
}

export const refreshByIdAsync = cityId => async dispatch => {
  console.log('refreshByIdAsync', cityId);

  try {
    const result = await fetchCurrentById(cityId);
    if (debug.randomizeTempsOnRefresh) {
      // Fudge for testing
      result.temperature += 20*Math.random() - 10;
    }
    console.log('refreshByIdAsync result = ', result);
    dispatch(updateCity(result));
    dispatch(clearError());
  } catch (err) {
    console.error(err);
    dispatch(setError(err.message || 'Unknown error occurred'));
  }
};

export const selectError = state => state.city.error;
export const selectCities = state => state.city.list;

export default citySlice.reducer;
