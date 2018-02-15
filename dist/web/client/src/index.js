'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

require('babel-core/register');

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = [_reduxThunk2.default];

if ((typeof devToolsExtension === 'undefined' ? 'undefined' : _typeof(devToolsExtension)) === 'object') {
  middleware.push(devToolsExtension);
}

var store = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), devToolsExtension ? devToolsExtension() : function (f) {
  return f;
})(_redux.createStore)(_reducers2.default);

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(_router2.default, null)
  )
), document.getElementById('root'));