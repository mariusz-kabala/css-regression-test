"use strict";

module.exports = function (results) {
  return JSON.stringify({
    summary: {
      Total: results.length,
      Success: results.filter(function (result) {
        return result.status === true;
      }).length,
      Fail: results.filter(function (result) {
        return result.status === false;
      }).length
    },
    details: results
  });
};