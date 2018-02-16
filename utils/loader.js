const constants = require('../constants')

module.exports = {
  getReporter: function(name=constants.modules.REPORTER) {
    switch (name) {
      default:
        return require('../reporters/progressBar');
    }
  },
  getResultFormatter: function(name=constants.modules.RESULTS_FORMATTER) {
    switch (name) {
      case 'json':
      case 'html': // html uses json as input
        return require('../formatters/result/json');

      default:
        return require('../formatters/result/console');
    }
  },
  getResultsFormatter: function(name=constants.modules.RESULTS_FORMATTER) {
    switch (name) {
      case 'json':
        return require('../formatters/results/json');

      case 'html':
        return require('../formatters/results/html');  

      default:
        return require('../formatters/results/console');
    }
  },
  getResultsSaver: function(name=constants.modules.RESULTS_SAVER) {
    switch (name) {
      case 'html':
        return require('../saveTestResults/html');
      default:
        return require('../saveTestResults/file');
    }
  },
  getResultsReader: function(name=constants.modules.RESULTS_SAVER) {
    switch (name) {
      default:
        return require('../getTestResults/file');
    }
  },
  getSingleResultReader: function(name=constants.modules.RESULTS_SAVER) {
    switch (name) {
      default:
        return require('../getSingleTestResult/file');
    }
  },
  getImagesManager: function(name=constants.modules.IMAGES_SAVER) {
    switch (name) {
      default:
        return require('../images/file');
    }
  }
}
