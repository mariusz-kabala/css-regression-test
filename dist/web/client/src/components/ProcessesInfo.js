'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reactRedux = require('react-redux');

var _styles = require('material-ui/styles');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _currentlyRunning = require('../actions/currentlyRunning');

var _reactPortalTooltip = require('react-portal-tooltip');

var _reactPortalTooltip2 = _interopRequireDefault(_reactPortalTooltip);

var _Progress = require('material-ui/Progress');

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Table = require('material-ui/Table');

var _Table2 = _interopRequireDefault(_Table);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    main: {
      marginLeft: '25px',
      color: 'black',
      padding: '10px',
      fontSize: '13px',
      cursor: 'pointer'
    },
    elName: {
      minWidth: '70px',
      display: 'inline-block',
      textAlign: 'right'
    },
    loader: {
      textAlign: 'center'
    },
    tooltip: {
      minWidth: '350px'
    },
    processInfo: {
      cursor: 'pointer'
    }
  };
};

var ProcessesInfo = function (_React$Component) {
  _inherits(ProcessesInfo, _React$Component);

  function ProcessesInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ProcessesInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProcessesInfo.__proto__ || Object.getPrototypeOf(ProcessesInfo)).call.apply(_ref, [this].concat(args))), _this), _this.handlePaperClick = function (event) {
      event.preventDefault();

      var _this$props = _this.props,
          onClick = _this$props.onClick,
          isActive = _this$props.isActive;


      onClick(!isActive);
    }, _this.getHandleProcessClick = function (id) {
      return function (event) {
        var _this$props2 = _this.props,
            onProcessClick = _this$props2.onProcessClick,
            history = _this$props2.history;


        event.preventDefault();

        onProcessClick(id, history);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ProcessesInfo, [{
    key: 'renderLoader',
    value: function renderLoader() {
      var classes = this.props.classes;


      return _react2.default.createElement(
        'div',
        { className: classes.loader },
        _react2.default.createElement(_Progress.CircularProgress, { size: 50, color: 'accent' })
      );
    }
  }, {
    key: 'renderEmptyList',
    value: function renderEmptyList() {
      return _react2.default.createElement(
        'p',
        null,
        'Nothing is running right now'
      );
    }
  }, {
    key: 'renderProcesses',
    value: function renderProcesses(processes) {
      var _this2 = this;

      var classes = this.props.classes;


      return _react2.default.createElement(
        _Table2.default,
        null,
        _react2.default.createElement(
          _Table.TableBody,
          null,
          processes.map(function (process) {
            return _react2.default.createElement(
              _Table.TableRow,
              {
                className: classes.processInfo,
                onClick: _this2.getHandleProcessClick(process.id),
                key: process.id
              },
              _react2.default.createElement(
                _Table.TableCell,
                null,
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'strong',
                    { className: classes.elName },
                    'name:'
                  ),
                  ' ',
                  process.testName
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'strong',
                    { className: classes.elName },
                    'url:'
                  ),
                  ' ',
                  process.url
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'strong',
                    { className: classes.elName },
                    'threshold:'
                  ),
                  ' ',
                  process.threshold
                )
              )
            );
          })
        )
      );
    }
  }, {
    key: 'renderTooltipContent',
    value: function renderTooltipContent() {
      var _props = this.props,
          isLoading = _props.isLoading,
          processes = _props.processes;


      if (isLoading === true) {
        return this.renderLoader();
      }

      if (processes.length === 0) {
        return this.renderEmptyList();
      }

      return this.renderProcesses(processes);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          amountOfProcesses = _props2.amountOfProcesses,
          classes = _props2.classes,
          isActive = _props2.isActive;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Paper2.default,
          { id: 'processesInfo', onClick: this.handlePaperClick, className: classes.main },
          _react2.default.createElement(
            'span',
            null,
            'Currently running: '
          ),
          _react2.default.createElement(
            'strong',
            null,
            amountOfProcesses
          )
        ),
        _react2.default.createElement(
          _reactPortalTooltip2.default,
          {
            active: isActive,
            position: 'bottom',
            arrow: 'center',
            parent: '#processesInfo'
          },
          _react2.default.createElement(
            'div',
            { className: classes.tooltip },
            _react2.default.createElement(
              _Typography2.default,
              { type: 'subheading', align: 'center', gutterBottom: true },
              'Currently running:'
            ),
            this.renderTooltipContent()
          )
        )
      );
    }
  }]);

  return ProcessesInfo;
}(_react2.default.Component);

ProcessesInfo.propTypes = {
  amountOfProcesses: _propTypes2.default.number.isRequired,
  onClick: _propTypes2.default.func.isRequired,
  onProcessClick: _propTypes2.default.func.isRequired,
  isLoading: _propTypes2.default.bool.isRequired
};

exports.default = (0, _compose2.default)(_reactRouter.withRouter, (0, _styles.withStyles)(styles, {
  name: 'ProcessesInfo'
}), (0, _reactRedux.connect)(function (state) {
  return {
    amountOfProcesses: state.amountOfRunningProcesses,
    isActive: state.isRunningProcessesInfoTooltipOpen,
    isLoading: state.isLoading.currentlyRunning,
    processes: state.currentlyRunningProcesses
  };
}, function (dispatch) {
  return {
    onClick: function onClick(isActive) {
      isActive && dispatch((0, _currentlyRunning.fetchCurrentlyRunningProcessesIfNeeded)());
      dispatch((0, _currentlyRunning.toggleCurrentlyRunningProcesses)());
    },
    onProcessClick: function onProcessClick(id, history) {
      return dispatch((0, _currentlyRunning.goToRunningProcessDetailsIfNeeded)(id, history));
    }
  };
}))(ProcessesInfo);
module.exports = exports['default'];