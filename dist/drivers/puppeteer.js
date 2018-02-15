'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var puppeteer = require('puppeteer');
var _ = require('lodash');
var constants = require('../constants');

var PuppeteerDriver = function () {
  function PuppeteerDriver(_ref) {
    var _actionsMapper;

    var scenario = _ref.scenario,
        workingDir = _ref.workingDir,
        defaultConfig = _ref.defaultConfig,
        url = _ref.url,
        logger = _ref.logger;

    _classCallCheck(this, PuppeteerDriver);

    this.scenario = scenario;
    this.viewport = undefined;
    this.workDir = workingDir;
    this.defaultConfig = defaultConfig;
    this.url = url;
    this.logger = logger;
    this.cookies = [];

    this.actionsMapper = (_actionsMapper = {}, _defineProperty(_actionsMapper, constants.actions.WAIT_FOR_SELECTOR, this.actionWaitForSelector.bind(this)), _defineProperty(_actionsMapper, constants.actions.FILL, this.actionFill.bind(this)), _defineProperty(_actionsMapper, constants.actions.SUBMIT, this.actionSubmit.bind(this)), _defineProperty(_actionsMapper, constants.actions.CLICK, this.actionClick.bind(this)), _defineProperty(_actionsMapper, constants.actions.SELECTOR, this.actionSelector.bind(this)), _actionsMapper);
  }

  _createClass(PuppeteerDriver, [{
    key: 'setCookies',
    value: function setCookies(cookies) {
      if (Array.isArray(cookies) === false) {
        throw new Exception('You can only provide an array of cookies');
      }

      this.cookies = cookies;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        puppeteer.launch({ headless: true }).then(function (browser) {
          _this.browser = browser;
          _this.logger.debug('Initialize new browser instance');
          resolve();
        });
      });
    }
  }, {
    key: 'findActionExecutor',
    value: function findActionExecutor(actionName) {
      if (typeof this.actionsMapper[actionName] === 'undefined') {
        this.logger.error('Invalid action name provided - ' + actionName);
        return undefined;
      }

      return this.actionsMapper[actionName];
    }
  }, {
    key: 'actionWaitForSelector',
    value: function actionWaitForSelector(page, name, value) {
      this.logger.debug('Waiting for selector', value);

      return page.waitForSelector(value);
    }
  }, {
    key: 'actionFill',
    value: function actionFill(page, name, value) {
      var _this2 = this;

      this.logger.debug('Filling the from with selector ' + value.field);

      return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return page.click(value.field);

                case 2:
                  _context.next = 4;
                  return page.keyboard.type(value.value);

                case 4:

                  resolve();

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'actionSubmit',
    value: function actionSubmit(page, name, value) {
      var _this3 = this;

      this.logger.debug('Submiting a from using the selector ' + value);

      return new Promise(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return page.click(value);

                case 2:
                  _context2.next = 4;
                  return page.waitForNavigation();

                case 4:

                  resolve();

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this3);
        }));

        return function (_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'actionClick',
    value: function actionClick(page, name, value) {
      var _this4 = this;

      this.logger.debug('Clicking on element', value);
      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return page.click(value);

                case 3:
                  _context3.next = 8;
                  break;

                case 5:
                  _context3.prev = 5;
                  _context3.t0 = _context3['catch'](0);

                  _this4.logger.error('Can not click on element', _context3.t0);

                case 8:

                  resolve();

                case 9:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this4, [[0, 5]]);
        }));

        return function (_x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'actionSelector',
    value: function actionSelector(page, name, value) {
      this.logger.debug('Taking screenshot of', value);
      return this.takeScreenshot(page, name, { selector: value });
    }
  }, {
    key: 'screenshotDOMElement',
    value: function screenshotDOMElement(page) {
      var _this5 = this;

      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var padding = 'padding' in opts ? opts.padding : 0;
      var path = 'path' in opts ? opts.path : null;
      var selector = opts.selector;

      if (!selector) {
        throw Error('Please provide a selector.');
      }

      return new Promise(function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
          var rect;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return page.evaluate(function (selector) {
                    var element = document.querySelector(selector);

                    if (!element) {
                      return null;
                    }

                    var _element$getBoundingC = element.getBoundingClientRect(),
                        x = _element$getBoundingC.x,
                        y = _element$getBoundingC.y,
                        width = _element$getBoundingC.width,
                        height = _element$getBoundingC.height;

                    return { left: x, top: y, width: width, height: height, id: element.id };
                  }, selector);

                case 2:
                  rect = _context4.sent;

                  if (rect) {
                    _context4.next = 5;
                    break;
                  }

                  return _context4.abrupt('return', reject('Could not find element that matches selector: ' + selector + '.'));

                case 5:
                  _context4.t0 = resolve;
                  _context4.next = 8;
                  return page.screenshot({
                    path: path,
                    clip: {
                      x: rect.left - padding,
                      y: rect.top - padding,
                      width: rect.width + padding * 2,
                      height: rect.height + padding * 2
                    }
                  });

                case 8:
                  _context4.t1 = _context4.sent;
                  (0, _context4.t0)(_context4.t1);

                case 10:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this5);
        }));

        return function (_x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'getValue',
    value: function getValue(field) {
      return _.get(this.scenario, field, _.get(this.defaultConfig, field, undefined));
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      var url = this.getValue('url');

      return '' + this.url + url;
    }
  }, {
    key: 'takeScreenshot',
    value: function takeScreenshot(page, name) {
      var _this6 = this;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var testCaseName = this.getValue('name');
      var url = this.getValue('url');
      var filename = new Buffer((testCaseName + '-' + url + '-' + name + '-' + this.viewport).toString('base64')).toString('base64');

      opts.path = this.workDir + '/' + filename + '.png';

      return new Promise(function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _this6.screenshotDOMElement(page, opts);

                case 3:
                  _context5.next = 8;
                  break;

                case 5:
                  _context5.prev = 5;
                  _context5.t0 = _context5['catch'](0);

                  _this6.logger.error('Taking a screenshot failed', _context5.t0);

                case 8:
                  resolve();

                case 9:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this6, [[0, 5]]);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'runObjectScenario',
    value: function runObjectScenario(page, name, todo) {
      var _this7 = this;

      return new Promise(function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, action, keyValue;

          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context6.prev = 3;
                  _iterator = Object.keys(todo)[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context6.next = 14;
                    break;
                  }

                  key = _step.value;
                  action = _this7.findActionExecutor(key);
                  keyValue = todo[key];
                  _context6.next = 11;
                  return action(page, name, keyValue);

                case 11:
                  _iteratorNormalCompletion = true;
                  _context6.next = 5;
                  break;

                case 14:
                  _context6.next = 20;
                  break;

                case 16:
                  _context6.prev = 16;
                  _context6.t0 = _context6['catch'](3);
                  _didIteratorError = true;
                  _iteratorError = _context6.t0;

                case 20:
                  _context6.prev = 20;
                  _context6.prev = 21;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 23:
                  _context6.prev = 23;

                  if (!_didIteratorError) {
                    _context6.next = 26;
                    break;
                  }

                  throw _iteratorError;

                case 26:
                  return _context6.finish(23);

                case 27:
                  return _context6.finish(20);

                case 28:

                  resolve(page);

                case 29:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this7, [[3, 16, 20, 28], [21,, 23, 27]]);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'runArrayScenario',
    value: function runArrayScenario(page, name, todo) {
      var _this8 = this;

      return new Promise(function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
          var x, _step2, action;

          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  x = 0;

                case 1:
                  if (!(x < todo.length)) {
                    _context7.next = 9;
                    break;
                  }

                  _step2 = todo[x];
                  action = _this8.findActionExecutor(_step2.action);
                  _context7.next = 6;
                  return action(page, name, _step2.value);

                case 6:
                  x += 1;
                  _context7.next = 1;
                  break;

                case 9:

                  resolve(page);

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, _this8);
        }));

        return function (_x15, _x16) {
          return _ref8.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'runTest',
    value: function runTest(page, testCase) {
      var todo = _.get(testCase, 'todo');
      var name = _.get(testCase, 'name');

      if (Array.isArray(todo) === true) {
        return this.runArrayScenario(page, name, todo);
      } else if (_.isObject(todo) === true) {
        return this.runObjectScenario(page, name, todo);
      } else {
        this.logger.error('Invalid scenario format, please check ' + name + ' scenario');
        return new Promise(function (resolve, reject) {
          reject('Invalid scenario format, please check ' + name + ' scenario');
        });
      }
    }
  }, {
    key: 'setViewport',
    value: function setViewport(page, viewport) {
      this.viewport = viewport.width + '-' + viewport.height;

      this.logger.debug('Setting view port to ' + viewport.width + 'x' + viewport.height);

      page.setViewport(viewport);
    }
  }, {
    key: 'applyCookies',
    value: function applyCookies(page) {
      this.cookies.forEach(function (cookie) {
        page.setCookie(cookie);
      });
    }
  }, {
    key: 'execute',
    value: function execute() {
      var _this9 = this;

      return new Promise(function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
          var page, authenticate, url, waitForSelector, viewPorts, tests, runTestCases, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step4, viewport;

          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return _this9.browser.newPage();

                case 2:
                  page = _context9.sent;
                  authenticate = _this9.getValue('authenticate');
                  url = _this9.getUrl();
                  waitForSelector = _this9.getValue('waitForSelector');
                  viewPorts = _this9.getValue('viewports');
                  tests = _this9.getValue('tests');

                  runTestCases = function runTestCases() {
                    return new Promise(function () {
                      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
                        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step3, testCase;

                        return regeneratorRuntime.wrap(function _callee8$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context8.prev = 3;
                                _iterator2 = tests[Symbol.iterator]();

                              case 5:
                                if (_iteratorNormalCompletion2 = (_step3 = _iterator2.next()).done) {
                                  _context8.next = 13;
                                  break;
                                }

                                testCase = _step3.value;

                                _this9.logger.debug('Running test case', testCase.name);
                                _context8.next = 10;
                                return _this9.runTest(page, testCase);

                              case 10:
                                _iteratorNormalCompletion2 = true;
                                _context8.next = 5;
                                break;

                              case 13:
                                _context8.next = 19;
                                break;

                              case 15:
                                _context8.prev = 15;
                                _context8.t0 = _context8['catch'](3);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context8.t0;

                              case 19:
                                _context8.prev = 19;
                                _context8.prev = 20;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                  _iterator2.return();
                                }

                              case 22:
                                _context8.prev = 22;

                                if (!_didIteratorError2) {
                                  _context8.next = 25;
                                  break;
                                }

                                throw _iteratorError2;

                              case 25:
                                return _context8.finish(22);

                              case 26:
                                return _context8.finish(19);

                              case 27:

                                resolve();

                              case 28:
                              case 'end':
                                return _context8.stop();
                            }
                          }
                        }, _callee8, _this9, [[3, 15, 19, 27], [20,, 22, 26]]);
                      }));

                      return function (_x19, _x20) {
                        return _ref10.apply(this, arguments);
                      };
                    }());
                  };

                  if (!(typeof authenticate !== 'undefined')) {
                    _context9.next = 12;
                    break;
                  }

                  _context9.next = 12;
                  return page.authenticate(authenticate);

                case 12:

                  _this9.applyCookies(page);

                  _this9.logger.info('Opening URL: ' + url);
                  _context9.next = 16;
                  return page.goto(url);

                case 16:
                  if (!(Array.isArray(tests) === true)) {
                    _context9.next = 51;
                    break;
                  }

                  if (!(Array.isArray(viewPorts) === true)) {
                    _context9.next = 47;
                    break;
                  }

                  _iteratorNormalCompletion3 = true;
                  _didIteratorError3 = false;
                  _iteratorError3 = undefined;
                  _context9.prev = 21;
                  _iterator3 = viewPorts[Symbol.iterator]();

                case 23:
                  if (_iteratorNormalCompletion3 = (_step4 = _iterator3.next()).done) {
                    _context9.next = 31;
                    break;
                  }

                  viewport = _step4.value;

                  _this9.setViewport(page, viewport);
                  _context9.next = 28;
                  return runTestCases();

                case 28:
                  _iteratorNormalCompletion3 = true;
                  _context9.next = 23;
                  break;

                case 31:
                  _context9.next = 37;
                  break;

                case 33:
                  _context9.prev = 33;
                  _context9.t0 = _context9['catch'](21);
                  _didIteratorError3 = true;
                  _iteratorError3 = _context9.t0;

                case 37:
                  _context9.prev = 37;
                  _context9.prev = 38;

                  if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                  }

                case 40:
                  _context9.prev = 40;

                  if (!_didIteratorError3) {
                    _context9.next = 43;
                    break;
                  }

                  throw _iteratorError3;

                case 43:
                  return _context9.finish(40);

                case 44:
                  return _context9.finish(37);

                case 45:
                  _context9.next = 48;
                  break;

                case 47:
                  runTestCases();

                case 48:

                  resolve();
                  _context9.next = 57;
                  break;

                case 51:
                  _this9.logger.debug('Running single test case');
                  _context9.t1 = resolve;
                  _context9.next = 55;
                  return _this9.runTest(page, _this9.scenario);

                case 55:
                  _context9.t2 = _context9.sent;
                  (0, _context9.t1)(_context9.t2);

                case 57:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, _this9, [[21, 33, 37, 45], [38,, 40, 44]]);
        }));

        return function (_x17, _x18) {
          return _ref9.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'cookies',
    value: function cookies() {
      return this.browser.cookies();
    }
  }, {
    key: 'close',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.browser.close();

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function close() {
        return _ref11.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return PuppeteerDriver;
}();

module.exports = PuppeteerDriver;