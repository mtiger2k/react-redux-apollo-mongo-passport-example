var path = require('path');
var express = require('express');
var port = process.env.PORT || 8080;
var app = express();

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

app.use(express.static(path.join(__dirname, "assets")));

app.get(['*.js','*.png','*.css','*.map','*.ico'], function(req, res) {
  res.sendFile(path.join(__dirname, 'assets', req.path));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:'+port);
});

