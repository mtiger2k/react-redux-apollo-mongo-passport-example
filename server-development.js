var path = require('path');
var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');

require('dotenv').config();

(function() {

var webpack = require('webpack');
var config = require('./webpack-development.config');
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo:true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));
})();

const apiPort = process.env.API_PORT;
const apiHost = `http://localhost:${apiPort}`;
const apiUrl = `${apiHost}/graphql`;

const apiProxy = proxy({ target: apiHost });
app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/signin', apiProxy);
app.use('/loadAuth', apiProxy);
app.use('/logout', apiProxy);


app.use(express.static(path.join(__dirname, "assets")));

app.get(['*.js','*.png','*.css','*.map','*.ico'], function(req, res) {
  res.sendFile(path.join(__dirname, 'assets', req.path));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

var PORT = process.env.PORT;

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:'+PORT);
});

