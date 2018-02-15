'use strict';

var getListOfTestScenarios = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var scenarios, images;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readScenarios(constants.SCENARIOS_DIR);

          case 2:
            scenarios = _context.sent;
            _context.next = 5;
            return imagesReader.getAllTargetImages();

          case 5:
            images = _context.sent;

            res.json(mergeScenariosAndImages(parseScenarios(scenarios), images));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getListOfTestScenarios(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var readScenarios = require('../../../utils/readScenarios');
var constants = require('../../../constants');
var imagesReader = require('../../../images/file');

function parseScenarios(scenarios) {
  var result = [];
  var findScenario = function findScenario(scenario) {
    for (var x = 0; x < result.length; x += 1) {
      if (result[x].name === scenario.name) {
        return x;
      }
    }

    return -1;
  };

  var hasTest = function hasTest(test, testsList) {
    for (var x = 0; x < testsList.length; x += 1) {
      if (testsList[x].name === test.name) {
        return true;
      }
    }

    return false;
  };

  scenarios.forEach(function (scenario) {
    var index = findScenario(scenario);

    if (index === -1) {
      index = result.push({
        name: scenario.name,
        urls: [scenario.url],
        tests: []
      }) - 1;
    } else if (result[index].urls.indexOf(scenario.url) === -1) {
      result[index].urls.push(scenario.url);
    }

    if (Array.isArray(scenario.tests) === true) {
      scenario.tests.forEach(function (testCase) {
        if (hasTest(testCase, result[index].tests) === false) {
          result[index].tests.push(testCase);
        }
      });
    }
  });

  return result;
}

function mergeScenariosAndImages(scenarios, images) {
  scenarios.forEach(function (scenario) {
    scenario.tests.forEach(function (test) {
      test.images = [];

      if (typeof images[scenario.name] !== 'undefined' && images[scenario.name][test.name] !== 'undefined') {
        test.images = images[scenario.name][test.name];
      }
    });
  });

  return scenarios;
}

module.exports = getListOfTestScenarios;