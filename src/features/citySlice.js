import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrentByName,
  fetchCurrentById,
  fetchForecastById,
} from '../app/api';
import * as debug from '../app/debug'
import { mockList } from '../app/apiMock';

const MAX_CITIES = 8;

export const citySlice = createSlice({
  name: 'city',
  initialState: {
      list: (debug.mockForStyling && mockList) || [],
      error: "",
  },
  reducers: {
    validateStart: (state, action) => {
      state.error = "";
      // TODO: Freeze input + spinner?
    },
    validateSuccess: (state, action) => {
      const city = action.payload;
      // Duplicate guarded city addition
      if (state.list.filter(c => c.id === city.id).length) {
        state.error = `City ${city.name} already added`
      } else {
        state.list = [city, ...state.list].slice(0, MAX_CITIES)
      }
    },
    validateError: (state, action) => {
      state.error = action.payload;
    },
    removeCity: (state, action) => {
      const city = action.payload;
      console.log('removeCity', city);
      state.list = state.list.filter(c => c.id !== city.id);
    },

    updateCity: (state, action) => {
      const city = action.payload;
      console.log('updateCity', city);
      if (city) {
        state.list = state.list.map(c => c.id === city.id ? city : c);
        state.error = "";
      } else {
        state.error = "Update failed, try again later";
      }
    },
    clear: (state, action) => {
      state.list = [];
    }
  },
});

export const {
  // Externally used actions
  removeCity, clear,
  // Interally used actions (thunk dispatches; exported for testing)
  validateStart, validateSuccess, validateError,
  updateCity,
} = citySlice.actions;

// Thunks for async actions
export const validateByNameAsync = cityName => async dispatch => {
  console.log(`validateByNameAsync '${cityName}'`);
  dispatch(validateStart());

  try {
    const result = await fetchCurrentByName(cityName);
    console.log('validateByNameAsync result = ', result);
    dispatch(validateSuccess(result));
  } catch (err) {
    console.error(err);
    dispatch(validateError(err.message || 'Unknown error occurred'));
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
  } catch (err) {
    console.error(err);
    dispatch(updateCity(null));
  }
};

export const selectError = state => state.city.error;
export const selectCities = state => state.city.list;

export default citySlice.reducer;
