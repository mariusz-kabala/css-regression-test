const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('../client/webpack.config');
const routes = require('./routes');

const app = express();
const compiler = webpack(config);

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

routes(app);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
