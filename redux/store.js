import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

export function makeStore() {
  return configureStore({
    reducer: { reducer },
  });
};

const store = makeStore();

export default store;
