import path from 'path';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscriptionManager } from './subscriptions';

import { setupLocalLogin } from './localLogin'
import schema from './schema';
import * as CounterService from './services/countService'

require('dotenv').config();

const API_PORT = process.env.API_PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

setupLocalLogin(app);

app.use('/graphql', graphqlExpress((req) => {
  // Get the query, the same way express-graphql does it
  // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }

  return {
    schema,
    context: {
      user: req.user,
      counterService: CounterService
    },
  };
}));

// Serve our helpful static landing page. Not used in production.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(API_PORT, () => console.log( // eslint-disable-line no-console
  `API Server is now running on http://localhost:${API_PORT}`
));


/******************************************************************************
 * wesocket server
 ******************************************************************************/

const WS_PORT = process.env.WS_PORT;

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));

// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,
  },
  websocketServer
);
