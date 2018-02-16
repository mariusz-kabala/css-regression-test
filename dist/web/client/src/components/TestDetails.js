'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestDetailsContainer = exports.styles = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _TestBlock = require('../components/TestBlock');

var _TestBlock2 = _interopRequireDefault(_TestBlock);

var _ScenarioTitle = require('../components/ScenarioTitle');

var _ScenarioTitle2 = _interopRequireDefault(_ScenarioTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = exports.styles = function styles(theme) {
  return {
    divider: {
      margin: '20px 0'
    },
    testSummary: {
      marginBottom: 16,
      padding: 16,
      background: 'linear-gradient(60deg, #8f42ff14 40%, #8f42ff58 80%)',
      borderRadius: 4,
      // border: '4px solid',
      // borderImage: 'linear-gradient(60deg, #8f42ff 40%, #c099ff 80%)',
      // borderImageSlice: 1,
      '@global': {
        ' > div': {
          margin: '0 16px',
          padding: 16
        },
        'span': {
          marginRight: 8,
          fontWeight: 500
        }
      }
    },
    testSummary__title: { fontSize: 20 },
    testSummary__details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    circleChart__circle: {
      transform: 'rotate(-90deg)',
      transformOrigin: 'center'
    }
  };
};

var TestDetailsContainer = exports.TestDetailsContainer = function (_React$Component) {
  _inherits(TestDetailsContainer, _React$Component);

  function TestDetailsContainer() {
    _classCallCheck(this, TestDetailsContainer);

    return _possibleConstructorReturn(this, (TestDetailsContainer.__proto__ || Object.getPrototypeOf(TestDetailsContainer)).apply(this, arguments));
  }

  _createClass(TestDetailsContainer, [{
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
    key: 'renderSummaryDetails',
    value: function renderSummaryDetails() {
      var _props2 = this.props,
          classes = _props2.classes,
          summary = _props2.summary;


      var testSucceeded = (summary.Success / summary.Total * 100).toFixed(1);

      return _react2.default.createElement(
        'div',
        { className: classes.testSummary },
        _react2.default.createElement(
          'h1',
          { className: classes.testSummary__title },
          'details and url'
        ),
        _react2.default.createElement(
          'div',
          { className: classes.testSummary__details },
          _react2.default.createElement(
            'svg',
            { className: classes.circleChart, viewBox: '0 0 33.83098862 33.83098862', width: '180', height: '180' },
            _react2.default.createElement('circle', { className: classes.circleChart__background, stroke: '#fafafa', strokeWidth: '2', fill: 'none', cx: '16.91549431', cy: '16.91549431', r: '15.91549431' }),
            _react2.default.createElement('circle', { className: classes.circleChart__circle, stroke: '#8f42ff', strokeWidth: '2', strokeDasharray: testSucceeded + ', 100', strokeLinecap: 'round', fill: 'none', cx: '16.91549431', cy: '16.91549431', r: '15.91549431' }),
            _react2.default.createElement(
              'text',
              { x: '16.91549431', y: '14', alignmentBaseline: 'central', textAnchor: 'middle', fontSize: '8' },
              testSucceeded,
              '%'
            ),
            _react2.default.createElement(
              'text',
              { x: '16.91549431', y: '22', alignmentBaseline: 'central', textAnchor: 'middle', fontSize: '2.4' },
              'Successful test'
            ),
            _react2.default.createElement(
              'text',
              { x: '16.91549431', y: '26', alignmentBaseline: 'central', textAnchor: 'middle', fontSize: '2.8' },
              summary.Success,
              ' / ',
              summary.Total
            )
          )
        )
      );
    }
  }, {
    key: 'renderDetails',
    value: function renderDetails() {
      var _props3 = this.props,
          details = _props3.details,
          classes = _props3.classes,
          id = _props3.match.params.id,
          hideControls = _props3.hideControls,
          imagePath = _props3.imagePath;

      var scenario = void 0;

      return details.map(function (detail, key) {
        var testBlock = _react2.default.createElement(_TestBlock2.default, _extends({
          testID: id,
          key: 'test-' + key,
          hideControls: hideControls,
          imagePath: imagePath
        }, detail));
        var result = [];
        if (detail.scenario !== scenario) {
          scenario = detail.scenario;

          result.push(_react2.default.createElement(
            _ScenarioTitle2.default,
            { key: 'scenario-' + scenario },
            scenario
          ));
        }

        result.push(testBlock);
        result.push(_react2.default.createElement(_Divider2.default, { className: classes.divider, key: 'divider-' + key }));

        return result;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.renderSummaryDetails(),
        this.renderDetails()
      );
    }
  }]);

  return TestDetailsContainer;
}(_react2.default.Component);

TestDetailsContainer.propTypes = {
  onReady: _propTypes2.default.func,
  summary: _propTypes2.default.object.isRequired,
  details: _propTypes2.default.array.isRequired,
  hideControls: _propTypes2.default.bool,
  imagePath: _propTypes2.default.string
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'TestDetailsContainer'
}))(TestDetailsContainer);