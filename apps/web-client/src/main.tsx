import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { STATE_FEATURE_KEY, stateReducer } from './app/state.slice';

const store = configureStore({
  reducer: { [STATE_FEATURE_KEY]: stateReducer },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
