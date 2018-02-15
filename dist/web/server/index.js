'use strict';

var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('../client/webpack.config');
var routes = require('./routes');
var bodyParser = require('body-parser');
var pm = require('./lib/processesManager');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var compiler = webpack(config);

var FileLogsReader = require('../../logsStoreReader/file');

function injectIoToRequest(io) {
  return function (req, res, next) {
    req.io = io;

    next();
  };
};

pm.io = io;
pm.logsReader = new FileLogsReader();

app.use(injectIoToRequest(io));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(require('webpack-hot-middleware')(compiler));

routes(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});