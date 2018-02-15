'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INFO_LOG_LEVEL = 'info';
var DEBUG_LOG_LEVEL = 'debug';
var ERROR_LOG_LEVEL = 'error';

module.exports = function () {
  function Logger(io, id) {
    var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Logger);

    this.io = io;
    this.id = id;
    this.storage = storage;
  }

  _createClass(Logger, [{
    key: 'info',
    value: function info() {
      this.sendLogMessage(Array.prototype.slice.call(arguments), INFO_LOG_LEVEL);
    }
  }, {
    key: 'debug',
    value: function debug() {
      this.sendLogMessage(Array.prototype.slice.call(arguments), DEBUG_LOG_LEVEL);
    }
  }, {
    key: 'error',
    value: function error() {
      this.sendLogMessage(Array.prototype.slice.call(arguments), ERROR_LOG_LEVEL);
    }
  }, {
    key: 'sendLogMessage',
    value: function sendLogMessage(message, level) {
      this.io.emit('log', {
        message: message,
        level: level,
        id: this.id
      });

      if (this.storage !== null) {
        this.storage.save({
          message: message,
          level: level
        });
      }
    }
  }]);

  return Logger;
}();