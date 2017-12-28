const INFO_LOG_LEVEL = 'info';
const DEBUG_LOG_LEVEL = 'debug';
const ERROR_LOG_LEVEL = 'error';

module.exports = class Logger {
  constructor(io, id) {
    this.io = io;
    this.id = id;
  }

  info() {
    this.sendLogMessage(
      Array.prototype.slice.call(arguments),
      INFO_LOG_LEVEL
    );
  }

  debug() {
    this.sendLogMessage(
      Array.prototype.slice.call(arguments),
      DEBUG_LOG_LEVEL
    );
  }

  error() {
    this.sendLogMessage(
      Array.prototype.slice.call(arguments),
      ERROR_LOG_LEVEL
    );
  }

  sendLogMessage(message, level) {
    this.io.emit('log', {
      message,
      level,
      id: this.id
    });
  }
}
