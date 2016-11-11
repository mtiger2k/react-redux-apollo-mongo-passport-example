'use strict';
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import { ReduxAsyncConnect } from 'redux-connect';
import configureStore from '../shared/store/configure-store';
import { StyleSheet } from 'aphrodite'

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES)

render(
  <Provider store={store}>
    <Router render={(props) => <ReduxAsyncConnect {...props} />} routes={routes} history={ browserHistory } />
  </Provider>,
  document.getElementById('app')
)

