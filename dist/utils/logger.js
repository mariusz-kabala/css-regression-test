'use strict';

var colors = require('colors');

module.exports = {
  info: function info() {
    var _console;

    (_console = console).log.apply(_console, [colors.green('[INFO]')].concat(Array.prototype.slice.call(arguments)));
  },
  debug: function debug() {
    var _console2;

    (_console2 = console).log.apply(_console2, [colors.blue('[DEBUG]')].concat(Array.prototype.slice.call(arguments)));
  },
  error: function error() {
    var _console3;

    (_console3 = console).error.apply(_console3, [colors.blue('[ERROR]')].concat(Array.prototype.slice.call(arguments)));
  }
};