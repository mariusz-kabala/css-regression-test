'use strict';

var getJson = require('./json');
var render = require('../../dist/templates/render');
module.exports = function (id, results) {
  return render(id, results);
};