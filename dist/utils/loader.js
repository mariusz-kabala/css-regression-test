'use strict';

var constants = require('../constants');

module.exports = {
  getReporter: function getReporter() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.REPORTER;

    switch (name) {
      default:
        return require('../reporters/progressBar');
    }
  },
  getResultFormatter: function getResultFormatter() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.RESULTS_FORMATTER;

    switch (name) {
      case 'json':
      case 'html':
        // html uses json as input
        return require('../formatters/result/json');

      default:
        return require('../formatters/result/console');
    }
  },
  getResultsFormatter: function getResultsFormatter() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.RESULTS_FORMATTER;

    switch (name) {
      case 'json':
        return require('../formatters/results/json');

      case 'html':
        return require('../formatters/results/html');

      default:
        return require('../formatters/results/console');
    }
  },
  getResultsSaver: function getResultsSaver() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.RESULTS_SAVER;

    switch (name) {
      case 'html':
        return require('../saveTestResults/html');
      default:
        return require('../saveTestResults/file');
    }
  },
  getResultsReader: function getResultsReader() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.RESULTS_SAVER;

    switch (name) {
      default:
        return require('../getTestResults/file');
    }
  },
  getSingleResultReader: function getSingleResultReader() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.RESULTS_SAVER;

    switch (name) {
      default:
        return require('../getSingleTestResult/file');
    }
  },
  getImagesManager: function getImagesManager() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : constants.modules.IMAGES_SAVER;

    switch (name) {
      default:
        return require('../images/file');
    }
  }
};