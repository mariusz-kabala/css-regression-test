'use strict';

var prettyjson = require('prettyjson');
var colors = require('colors');

module.exports = function (results) {
  console.log("\n");
  return prettyjson.render({
    Total: colors.white(results.length),
    Success: colors.green(results.filter(function (result) {
      return result.status === true;
    }).length),
    Fail: colors.red(results.filter(function (result) {
      return result.status === false;
    }).length)
  });
};