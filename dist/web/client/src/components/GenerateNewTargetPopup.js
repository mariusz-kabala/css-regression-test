'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateNewTargetPopup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('material-ui/styles');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Form = require('material-ui/Form');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Progress = require('material-ui/Progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    mainUrl: {
      width: '500px'
    },
    loader: {
      textAlign: 'center'
    }
  };
};

var GenerateNewTargetPopup = exports.GenerateNewTargetPopup = function (_React$Component) {
  _inherits(GenerateNewTargetPopup, _React$Component);

  function GenerateNewTargetPopup() {
    _classCallCheck(this, GenerateNewTargetPopup);

    return _possibleConstructorReturn(this, (GenerateNewTargetPopup.__proto__ || Object.getPrototypeOf(GenerateNewTargetPopup)).apply(this, arguments));
  }

  _createClass(GenerateNewTargetPopup, [{
    key: 'renderForm',
    value: function renderForm() {
      var classes = this.props.classes;


      return _react2.default.createElement(
        _Form.FormControl,
        null,
        _react2.default.createElement(_TextField2.default, {
          value: '',
          onChange: function onChange() {
            return null;
          },
          className: classes.mainUrl,
          label: 'URL'
        })
      );
    }
  }, {
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
    key: 'renderContent',
    value: function renderContent() {
      var isLoading = this.props.isLoading;


      if (isLoading === true) {
        return this.renderLoader();
      }

      return this.renderForm();
    }
  }, {
    key: 'render',
    value: function render() {
      var open = this.props.open;


      return _react2.default.createElement(
        _Dialog2.default,
        { open: open },
        _react2.default.createElement(
          _Dialog.DialogTitle,
          null,
          'Generate a new target image'
        ),
        _react2.default.createElement(
          _Dialog.DialogContent,
          null,
          _react2.default.createElement(
            'div',
            { style: { width: '500px' } },
            this.renderContent()
          )
        ),
        _react2.default.createElement(
          _Dialog.DialogActions,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: function onClick() {
                return null;
              }, color: 'primary' },
            'Cancel'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: function onClick() {
                return null;
              }, color: 'primary' },
            'Generare'
          )
        )
      );
    }
  }]);

  return GenerateNewTargetPopup;
}(_react2.default.Component);

GenerateNewTargetPopup.propTypes = {
  open: _propTypes2.default.bool.isRequired,
  isLoading: _propTypes2.default.bool.isRequired
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'GenerateNewTargetPopup'
}), (0, _reactRedux.connect)(function (state) {
  return {
    open: state.generateNewTarget.isOpen,
    isLoading: state.isLoading.generateNewTarget
  };
}, function (dispatch) {
  return {};
}))(GenerateNewTargetPopup);