'use strict';

var pm = require('../lib/processesManager');

module.exports = function (req, res) {
  res.json(pm.list());
};