'use strict';
import 'babel-polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { routes } from '../routes';
import { StyleSheet } from 'aphrodite'

import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';

import configureStore from '../shared/store/configure-store';
import createApolloClient from '../shared/helpers/create-apollo-client';
import addGraphQLSubscriptions from '../shared/helpers/subscriptions';
import DevTools from '../shared/middleware/devtools';
const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

StyleSheet.rehydrate(window.RENDERED_CLASS_NAMES)

const wsClient = new Client(window.location.origin.replace(/^http/, 'ws')
    .replace(':' + process.env.PORT, ':' + process.env.WS_PORT));

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
    transportBatching: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = createApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
    ssrForceFetchDelay: 100
});

const initialState = window.__APOLLO_STATE__;
const store = configureStore(initialState, client);

render(
  <ApolloProvider client={client} store={store}>
    <div>
        {devTools}
      <Router routes={routes} history={ browserHistory } />
    </div>
  </ApolloProvider>,
  document.getElementById('app')
)

