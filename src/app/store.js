import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cityReducer from '../features/citySlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    city: cityReducer,
  },
});
