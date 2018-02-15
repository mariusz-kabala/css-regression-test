'use strict';

var ProgressBar = require('progress');
var prettyjson = require('prettyjson');

module.exports = {
  start: function start(counter) {
    this.bar = new ProgressBar('[:bar] :percent :elapsed s', { total: counter, width: 100 });
  },
  tick: function tick(data) {
    if (data !== null && typeof data !== 'undefined') {
      this.bar.interrupt(typeof data === 'string' ? data : prettyjson.render(data));

      if (typeof data !== 'string') {
        this.bar.interrupt('------------------');
      }
    }

    this.bar.tick();
  }
};