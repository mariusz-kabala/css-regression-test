'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = router;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Home = require('./containers/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Scenarios = require('./containers/Scenarios');

var _Scenarios2 = _interopRequireDefault(_Scenarios);

var _New = require('./containers/New');

var _New2 = _interopRequireDefault(_New);

var _TestDetails = require('./containers/TestDetails');

var _TestDetails2 = _interopRequireDefault(_TestDetails);

var _TestsList = require('./containers/TestsList');

var _TestsList2 = _interopRequireDefault(_TestsList);

var _AppFrame = require('./components/AppFrame');

var _AppFrame2 = _interopRequireDefault(_AppFrame);

var _ProcessDetails = require('./containers/ProcessDetails');

var _ProcessDetails2 = _interopRequireDefault(_ProcessDetails);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function router() {
  return _react2.default.createElement(
    _reactRouter.Router,
    { history: _history2.default },
    _react2.default.createElement(
      _AppFrame2.default,
      null,
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _Home2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: '/scenarios', component: _Scenarios2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: '/new', component: _New2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: '/processes/:id', component: _ProcessDetails2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: '/tests/:id', component: _TestDetails2.default }),
      _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/tests', component: _TestsList2.default })
    )
  );
}
module.exports = exports['default'];