'use strict';
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { StyleSheet } from 'aphrodite'
import jwtDecode from 'jwt-decode';

import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';

import getRoutes from '../routes';
import {setupAxiosInterceptors} from './axios';

import configureStore from '../shared/store/configure-store';
import createApolloClient from '../shared/helpers/create-apollo-client';
import addGraphQLSubscriptions from '../shared/helpers/subscriptions';
import DevTools from '../shared/middleware/devtools';
const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;
import {redirectToLoginWithMessage, signOutUser} from '../shared/actions/auth';

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES)

const wsClient = new Client(window.location.origin.replace(/^http/, 'ws')
    .replace(':' + process.env.PORT, ':' + process.env.WS_PORT));

const networkInterface = createNetworkInterface({uri: '/graphql'});
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }

        var token = localStorage.getItem('auth-token');
        if (token) {
            req.options.headers['Authorization'] = 'JWT '.concat(token);
        }
        next();
    }
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = createApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    //initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
    ssrForceFetchDelay: 100
});

let initialState = window.__INITIAL_STATE__;
let token = localStorage.getItem('auth-token');
if (token) {
    try {
        let user = jwtDecode(token);
        initialState = {
            auth: {authenticated: true, token: token, logging: false},
            user: {user, loading: false}
        };
    } catch(ex) {}
}

const store = configureStore(initialState, client);
const history = syncHistoryWithStore(browserHistory, store);

const actions = bindActionCreators({redirectToLoginWithMessage, signOutUser}, store.dispatch);
setupAxiosInterceptors(() => actions.redirectToLoginWithMessage('login.error.unauthorized'));

let routes = getRoutes(actions.signOutUser, store);

render(
  <ApolloProvider client={client} store={store}>
    <div>
      <Router render={(props) => <ReduxAsyncConnect {...props} />} routes={routes} history={ history } />
    </div>
  </ApolloProvider>,
  document.getElementById('app')
)

