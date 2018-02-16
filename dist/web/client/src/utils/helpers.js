'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.titleize = titleize;
exports.pageToTitle = pageToTitle;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _upperFirst = require('lodash/upperFirst');

var _upperFirst2 = _interopRequireDefault(_upperFirst);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function titleize(string) {
  (0, _warning2.default)(typeof string === 'string' && string.length > 0, 'Material-UI: titleize(string) expects a non empty string argument.');

  return string.split('-').map(function (word) {
    return word.split('');
  }).map(function (letters) {
    var first = letters.shift();
    return [first.toUpperCase()].concat(_toConsumableArray(letters)).join('');
  }).join(' ');
}

function pageToTitle(page) {
  if (page.title) {
    return page.title;
  }

  var name = page.pathname.replace(/.*\//, '');

  if (page.pathname.indexOf('/api') === 0) {
    return (0, _upperFirst2.default)((0, _camelCase2.default)(name));
  }

  return titleize(name);
}