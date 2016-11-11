'use strict';
import path from 'path';
import express from 'express';
import compression from 'compression';
import cpFile from 'cp-file';
import errorHandler from 'express-error-handler';
import envs from 'envs';
import qs from 'qs'
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Router, match, RouterContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { routes } from './build/routes';
import settings from './build/shared/settings';
import ReactDOMStream from 'react-dom-stream/server';
import serveStatic from 'serve-static';
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
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
import { fetchPostsAsync } from './build/shared/api/fetch-posts'
import Html from './build/shared/helpers/Html';
import { StyleSheetServer } from 'aphrodite'

const appRoutes = (app) => {
  app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (props) {

        // Compile an initial state
        const isFetching = false;
        const lastUpdated = Date.now()
        const initialState = {};
        // Create a new Redux store instance
        const store = configureStore(initialState)

      loadOnServer({ ...props, store, helpers: {}}).then(() => {

        const component = (
         <Provider store={store}>
           <ReduxAsyncConnect {...props} />
         </Provider>
        );
        const { htmlContent, css } = StyleSheetServer.renderStatic(() => ReactDOM.renderToString(component));

         let html = ReactDOM.renderToString(<Html title={settings.title} content={htmlContent} aphroditeCss={css} store={store}/>);
         res.status(200);
         res.send('<!doctype html>\n' + html);

        })
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
