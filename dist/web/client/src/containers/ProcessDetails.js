'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessDetailsContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _processDetails = require('../actions/processDetails');

var _Table = require('material-ui/Table');

var _Table2 = _interopRequireDefault(_Table);

var _styles = require('material-ui/styles');

var _Grid = require('material-ui/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    logs: {
      listStyleType: 'none',
      margin: '0',
      paddingLeft: '5px'
    },
    logLine: {
      padding: '6px 0',
      fontSize: '14px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.075)'
    },
    logLevel: {
      paddingRight: '5px',
      fontSize: '13px',
      fontWeight: '600',
      display: 'inline-block',
      minWidth: '60px',
      textAlign: 'right'
    },
    debug: {
      color: 'blue'
    },
    info: {
      color: 'green'
    }
  };
};

var ProcessDetailsContainer = exports.ProcessDetailsContainer = function (_React$Component) {
  _inherits(ProcessDetailsContainer, _React$Component);

  function ProcessDetailsContainer() {
    _classCallCheck(this, ProcessDetailsContainer);

    return _possibleConstructorReturn(this, (ProcessDetailsContainer.__proto__ || Object.getPrototypeOf(ProcessDetailsContainer)).apply(this, arguments));
  }

  _createClass(ProcessDetailsContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onReady = _props.onReady,
          match = _props.match;


      if (typeof onReady === 'function') {
        onReady(match.params.id);
      }
    }
  }, {
    key: 'renderInfo',
    value: function renderInfo() {
      var info = this.props.info;


      if (!info) {
        return null;
      }

      return _react2.default.createElement(
        _Table2.default,
        null,
        _react2.default.createElement(
          _Table.TableBody,
          null,
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(
              _Table.TableCell,
              null,
              _react2.default.createElement(
                'strong',
                null,
                'URL:'
              )
            ),
            _react2.default.createElement(
              _Table.TableCell,
              null,
              info.url
            )
          ),
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(
              _Table.TableCell,
              null,
              _react2.default.createElement(
                'strong',
                null,
                'name:'
              )
            ),
            _react2.default.createElement(
              _Table.TableCell,
              null,
              info.testName
            )
          ),
          _react2.default.createElement(
            _Table.TableRow,
            null,
            _react2.default.createElement(
              _Table.TableCell,
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Threshold:'
              )
            ),
            _react2.default.createElement(
              _Table.TableCell,
              null,
              info.threshold
            )
          )
        )
      );
    }
  }, {
    key: 'renderLogs',
    value: function renderLogs() {
      var _props2 = this.props,
          logs = _props2.logs,
          classes = _props2.classes;

      var renderMsg = function renderMsg(log) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: classes.logLevel + ' ' + classes[log.level] },
            '[',
            log.level,
            ']'
          ),
          _react2.default.createElement(
            'span',
            null,
            log.message.join(' ')
          )
        );
      };

      if (!logs) {
        return null;
      }

      return _react2.default.createElement(
        'ul',
        { className: classes.logs },
        logs.map(function (log, key) {
          return _react2.default.createElement(
            'li',
            { key: 'logMsg' + key, className: classes.logLine },
            renderMsg(log)
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 12, sm: 6 },
          _react2.default.createElement(
            _Typography2.default,
            { type: 'title', gutterBottom: true, color: 'inherit' },
            'Info:'
          ),
          this.renderInfo()
        ),
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 12, sm: 6 },
          _react2.default.createElement(
            _Typography2.default,
            { type: 'title', gutterBottom: true, color: 'inherit' },
            'Logs:'
          ),
          this.renderLogs()
        )
      );
    }
  }]);

  return ProcessDetailsContainer;
}(_react2.default.Component);

ProcessDetailsContainer.propTypes = {
  onReady: _propTypes2.default.func
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'ProcessDetails'
}), (0, _reactRedux.connect)(function (state) {
  var id = state.currentProcessID;
  return id ? state.processDetails[id] : {
    info: null,
    logs: []
  };
}, function (dispatch) {
  return {
    onReady: function onReady(id) {
      return dispatch((0, _processDetails.fetchProcessDetailsIfNeeded)(id));
    }
  };
}))(ProcessDetailsContainer);