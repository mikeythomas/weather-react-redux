import { createSlice } from '@reduxjs/toolkit';
import * as debug from '../app/debug';
import { fetchForecastById } from '../app/api';
import { mockDetail } from '../app/apiMock';

export const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    message: '',
    data: (debug.mockForStyling && mockDetail) || null
  },
  reducers: {
    fetchStart: (state, action) => {
      state.message = 'Loading';
      state.data = null;
    },
    fetchSuccess: (state, action) => {
      state.message = '';
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.message = action.payload;
      state.data = null;
    },
  },
});

export const {
  fetchStart, fetchSuccess, fetchError
} = detailsSlice.actions;

export const fetchDetailsAsync = cityId => async dispatch => {
  console.log('fetchDetailsAsync', cityId);
  dispatch(fetchStart())
  try {
    const result = await fetchForecastById(cityId);
    if (debug.randomizeTempsOnRefresh) {
      // Fudge for testing
      result.weatherList.forEach(w => w.temperature += 20*Math.random() - 10);
    }
    console.log('fetchForecastById result = ', result);
    dispatch(fetchSuccess(result));
  } catch (err) {
    console.error(err);
    dispatch(fetchError('Failed to get forecast, try again later'));
  }
};

export const selectMessage = state => state.details.message;
export const selectDetails = state => state.details.data;

export default detailsSlice.reducer;
