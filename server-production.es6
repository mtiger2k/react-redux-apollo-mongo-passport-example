'use strict';
import path from 'path';
import express from 'express';
import compression from 'compression';
import cpFile from 'cp-file';
import errorHandler from 'express-error-handler';
import envs from 'envs';
import React from 'react';
import ReactDOM from 'react-dom/server';
import proxy from 'http-proxy-middleware';

import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { renderToStringWithData } from 'react-apollo/server';

import { Router, match, RouterContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import getRoutes from './build/routes';
import settings from './build/shared/settings';
import serveStatic from 'serve-static';
import axios from 'axios';
require('dotenv').config();

const port = process.env.PROD_PORT || 8080;
const host = process.env.PROD_HOST || 'localhost';
const app = express();
const http = require('http');
app.set('environment', envs('NODE_ENV', process.env.NODE_ENV || 'production')); 
app.set('port', port);
app.use(compression());

cpFile('assets/app.css', 'public/assets/app.css').then(function(){
  console.log('Copied app.css');
});
app.use(serveStatic(path.join(__dirname, 'public', 'assets')));

import { Provider } from 'react-redux'
import configureStore from './build/shared/store/configure-store'
import createApolloClient from './build/shared/helpers/create-apollo-client';
import Html from './build/shared/helpers/Html';
import { StyleSheetServer } from 'aphrodite'

require('dotenv').config();

const apiPort = process.env.API_PORT || 3010;
const apiHost = `http://localhost:${apiPort}`;
const apiUrl = `${apiHost}/graphql`;

const apiProxy = proxy({ target: apiHost });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/signin', apiProxy);
app.use('/user', apiProxy);

const routes = getRoutes();

const appRoutes = (app) => {
  app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (props) {

          axios.get(apiHost+'/user', {headers:{'cookie': req.get('cookie')}}).then(response => {
              const client = createApolloClient({
                  ssrMode: true,
                  networkInterface: createNetworkInterface({
                      uri: apiUrl,
                      opts: {
                          credentials: 'same-origin',
                          // transfer request headers to networkInterface so that they're
                          // accessible to proxy server
                          // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
                          headers: req.headers,
                      },
                  }),
              });

              const initialState = {auth: {currentUser: response.data?response.data:null, loading: false}, apollo: {}};
              // Create a new Redux store instance
              const store = configureStore(initialState, client)

              loadOnServer({ ...props, store, helpers: {}}).then(() => {

                  const component = (
                      <ApolloProvider client={client} store={store}>
                      <ReduxAsyncConnect {...props} />
                  </ApolloProvider>
                  );

                  renderToStringWithData(component).then((content) => {
                      console.log(content);
                      //const data = client.store.getState().apollo.data;
                      const { htmlContent, css } = StyleSheetServer.renderStatic(() => ReactDOM.renderToString(component));
                      const initialState = client.store.getState();
                      let html = ReactDOM.renderToString(<Html title={settings.title} content={content} aphroditeCss={css} state={initialState}/>);
                      res.status(200);
                      res.send('<!doctype html>\n' + html);
                      res.end();

                  }).catch(e => {
                      console.error('RENDERING ERROR:', e);
                      res.status(500);
                      res.send(error);
                  }); // eslint-disable-line no-console

              });
          }).catch((error)=>{
              console.log(error);
              res.status(500);
              res.send(error);
          });
        } else {
        res.sendStatus(404);
      }
    });
  });
}
const router = express.Router();
appRoutes(router);
app.use(router);

const server = http.createServer(app);
app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

app.use( errorHandler({server: server}) );

app.listen(port, host, () => {
  console.log('Server started for '+settings.title+' at http://'+host+':'+port);
});
