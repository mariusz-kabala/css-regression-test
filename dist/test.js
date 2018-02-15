'use strict';

var html = require('./formatters/results/html');
var results = require('./reports/1509547367264.json');
var id = '1509547367264';
console.log(html(id, results));