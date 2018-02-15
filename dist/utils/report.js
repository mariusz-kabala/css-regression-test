'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (reporter) {
  return {
    reportProgress: function reportProgress(data) {
      if ((typeof reporter === 'undefined' ? 'undefined' : _typeof(reporter)) === 'object' && reporter !== null && typeof reporter.tick === 'function') {
        reporter.tick(data);
      }
    },
    startReport: function startReport(counter) {
      if ((typeof reporter === 'undefined' ? 'undefined' : _typeof(reporter)) === 'object' && reporter !== null && typeof reporter.start === 'function') {
        reporter.start(counter + 1);
      }
    }
  };
};