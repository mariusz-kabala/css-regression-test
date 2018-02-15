'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getPossibleUrls(scenario) {
  var url = scenario.url;

  if (typeof url === 'string') {
    return [url];
  }

  var variants = [];
  var path = url.path;
  var replaceVar = function replaceVar(path, variable, options) {
    return options.reduce(function (all, opt) {
      all.push(path.replace('{' + variable + '}', opt));
      return all;
    }, []);
  };
  var replaceInArr = function replaceInArr(variants, data) {
    var result = [];
    variants.forEach(function (variant) {
      result = result.concat(replaceVar.apply(undefined, [variant].concat(_toConsumableArray(data))));
    });

    return result;
  };

  Object.keys(url.vars).forEach(function (variable) {
    var options = url.vars[variable];

    if (variants.length === 0) {
      variants = replaceVar(path, variable, options);
    } else {
      variants = replaceInArr(variants, [variable, options]);
    }
  });

  return variants;
}

function parseSingleScenario(scenario) {
  var urls = getPossibleUrls(scenario);

  if (urls.length === 1) {
    scenario.url = urls[0];
    return scenario;
  }

  return urls.reduce(function (all, url) {
    all.push(_extends({}, scenario, { url: url }));
    return all;
  }, []);
}

module.exports = function (scenarios) {
  if (Array.isArray(scenarios) === true) {} else {
    return parseSingleScenario(scenarios);
  }
};