'use strict';
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import configureStore from '../shared/store/configure-store';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router routes={routes} history={ browserHistory } />
  </Provider>,
  document.getElementById('app')
)

