const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('../client/webpack.config');
const routes = require('./routes');
const bodyParser = require('body-parser');
const pm = require('./lib/processesManager');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const compiler = webpack(config);

function injectIoToRequest(io) {
  return function (req, res, next) {
    req.io = io;

    next();
  }
};

pm.io = io;

app.use(injectIoToRequest(io));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(require('webpack-hot-middleware')(compiler));

routes(app);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
