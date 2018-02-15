'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    scenarioTitle: {
      padding: 10,
      backgroundColor: '#6e14ff',
      background: 'linear-gradient(60deg, #8f42ff 40%, #c099ff 80%)'
    },
    scenarioTitleText: {
      color: '#fff',
      fontSize: 18,
      margin: 5,
      textTransform: 'uppercase'
    }
  };
};

var ScenarioTitle = function (_React$Component) {
  _inherits(ScenarioTitle, _React$Component);

  function ScenarioTitle() {
    _classCallCheck(this, ScenarioTitle);

    return _possibleConstructorReturn(this, (ScenarioTitle.__proto__ || Object.getPrototypeOf(ScenarioTitle)).apply(this, arguments));
  }

  _createClass(ScenarioTitle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          classes = _props.classes;


      return _react2.default.createElement(
        'div',
        { className: classes.scenarioTitle },
        _react2.default.createElement(
          'h1',
          { className: classes.scenarioTitleText },
          children
        )
      );
    }
  }]);

  return ScenarioTitle;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles, {
  name: 'scenarioTitle'
})(ScenarioTitle);
module.exports = exports['default'];