'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Input = require('material-ui/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Form = require('material-ui/Form');

var _Select = require('material-ui/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Menu = require('material-ui/Menu');

var _styles = require('material-ui/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reactRedux = require('react-redux');

var _scheduleNewTestRun = require('../actions/scheduleNewTestRun');

var _List = require('material-ui/List');

var _List2 = _interopRequireDefault(_List);

var _Collapse = require('material-ui/transitions/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    dialogMain: {
      maxWidth: '800px'
    },
    formItem: {
      marginTop: '10px'
    },
    mainUrl: {
      width: '500px'
    },
    url: {
      width: '300px',
      marginRight: '10px'
    }
  };
};

var NewTestRunPopup = function (_React$Component) {
  _inherits(NewTestRunPopup, _React$Component);

  function NewTestRunPopup(props) {
    _classCallCheck(this, NewTestRunPopup);

    var _this = _possibleConstructorReturn(this, (NewTestRunPopup.__proto__ || Object.getPrototypeOf(NewTestRunPopup)).call(this, props));

    _this.handleChange = function (name) {
      return function (event) {
        _this.setState(_defineProperty({}, name, event.target.value));
      };
    };

    _this.handleSelectChange = function (event) {
      _this.setState({ threshold: event.target.value });
    };

    _this.handleChooseTestClick = function (event) {
      _this.setState({
        fullScreen: true
      });
    };

    _this.handleFormSubmit = function (event) {
      var onSubmit = _this.props.onSubmit;


      onSubmit(_this.state);

      event.preventDefault();
    };

    _this.handleCancel = function (event) {
      var onCancel = _this.props.onCancel;


      onCancel();

      event.preventDefault();
    };

    _this.handleCheckboxChange = function (event, checked) {
      _this.setState({
        generateCookie: checked
      });
    };

    _this.state = {
      url: 'https://auto1-training-1.auto1-test.com',
      testName: '',
      threshold: 0.5,
      generateCookie: true,
      fullScreen: false
    };
    return _this;
  }

  _createClass(NewTestRunPopup, [{
    key: 'renderChooseTestsButton',
    value: function renderChooseTestsButton() {
      var fullScreen = this.state.fullScreen;


      if (fullScreen === true) {
        return null;
      }

      return _react2.default.createElement(
        _Form.FormControl,
        null,
        _react2.default.createElement(
          _Button2.default,
          {
            color: 'accent',
            raised: true,
            onClick: this.handleChooseTestClick
          },
          'Choose tests to run (all)'
        )
      );
    }
  }, {
    key: 'renderTestList',
    value: function renderTestList() {
      var fullScreen = this.state.fullScreen;
      var scenarios = this.props.scenarios;

      var renderTestList = function renderTestList(tests) {
        return _react2.default.createElement(
          _Collapse2.default,
          { component: 'li', 'in': true, timeout: 'auto', unmountOnExit: true },
          _react2.default.createElement(
            _List2.default,
            { disablePadding: true },
            tests.map(function (test) {
              return _react2.default.createElement(
                _List.ListItem,
                null,
                _react2.default.createElement(_Checkbox2.default, { checked: false, onChange: function onChange() {
                    return null;
                  } }),
                _react2.default.createElement(_List.ListItemText, { inset: true, primary: test.name })
              );
            })
          )
        );
      };

      if (fullScreen === false) {
        return null;
      }

      return _react2.default.createElement(
        _List2.default,
        null,
        scenarios.map(function (scenario) {
          return _react2.default.createElement(
            _List.ListItem,
            null,
            _react2.default.createElement(_List.ListItemText, { inset: true, primary: scenario.name }),
            renderTestList(scenario.tests)
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          classes = _props.classes;
      var _state = this.state,
          url = _state.url,
          testName = _state.testName,
          threshold = _state.threshold,
          generateCookie = _state.generateCookie,
          fullScreen = _state.fullScreen;


      return _react2.default.createElement(
        _Dialog2.default,
        {
          ignoreBackdropClick: true,
          ignoreEscapeKeyUp: true,
          open: open,
          fullScreen: fullScreen
        },
        _react2.default.createElement(
          _Dialog.DialogTitle,
          { id: 'confirmation-dialog-title' },
          'Schedule a new test run'
        ),
        _react2.default.createElement(
          _Dialog.DialogContent,
          { className: classes.dialogMain },
          _react2.default.createElement(
            'div',
            { style: { width: '500px' } },
            _react2.default.createElement(
              _Form.FormControl,
              null,
              _react2.default.createElement(_TextField2.default, {
                value: url,
                onChange: this.handleChange('url'),
                className: classes.mainUrl,
                label: 'URL'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: classes.formItem },
              _react2.default.createElement(
                _Form.FormControl,
                null,
                _react2.default.createElement(_TextField2.default, {
                  className: classes.url,
                  value: testName,
                  label: 'Test run name',
                  onChange: this.handleChange('testName')
                })
              ),
              _react2.default.createElement(
                _Form.FormControl,
                null,
                _react2.default.createElement(
                  _Input.InputLabel,
                  { htmlFor: 'age-simple' },
                  'Threshold'
                ),
                _react2.default.createElement(
                  _Select2.default,
                  {
                    value: threshold,
                    name: 'threshold',
                    onChange: this.handleSelectChange,
                    input: _react2.default.createElement(_Input2.default, { name: 'threshold', id: 'threshold' })
                  },
                  _react2.default.createElement(
                    _Menu.MenuItem,
                    { value: 0.1 },
                    '0.1'
                  ),
                  _react2.default.createElement(
                    _Menu.MenuItem,
                    { value: 0.5 },
                    '0.5'
                  ),
                  _react2.default.createElement(
                    _Menu.MenuItem,
                    { value: 1.0 },
                    '1.0'
                  ),
                  _react2.default.createElement(
                    _Menu.MenuItem,
                    { value: 1.5 },
                    '1.5'
                  ),
                  _react2.default.createElement(
                    _Menu.MenuItem,
                    { value: 2.0 },
                    '2.0'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: classes.formItem },
              _react2.default.createElement(
                _Form.FormControl,
                null,
                _react2.default.createElement(_Form.FormControlLabel, {
                  value: '1',
                  control: _react2.default.createElement(_Checkbox2.default, { checked: generateCookie, onChange: this.handleCheckboxChange }),
                  label: 'Generate auth cookie'
                })
              ),
              this.renderChooseTestsButton()
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            this.renderTestList()
          )
        ),
        _react2.default.createElement(
          _Dialog.DialogActions,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleCancel, color: 'primary' },
            'Cancel'
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleFormSubmit, color: 'primary' },
            'Start test'
          )
        )
      );
    }
  }]);

  return NewTestRunPopup;
}(_react2.default.Component);

NewTestRunPopup.propTypes = {
  open: _propTypes2.default.bool.isRequired,
  onSubmit: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,
  scenarios: _propTypes2.default.array.isRequired
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'NewTestRunPopup'
}), (0, _reactRedux.connect)(function (state) {
  return {
    scenarios: state.scenarios
  };
}, function (dispatch) {
  return {
    onSubmit: function onSubmit(data) {
      dispatch((0, _scheduleNewTestRun.scheduleNewTestRunIfNeeded)(data));
      dispatch((0, _scheduleNewTestRun.closeNewTestRunPopup)());
    },
    onCancel: function onCancel() {
      return dispatch((0, _scheduleNewTestRun.closeNewTestRunPopup)());
    }
  };
}))(NewTestRunPopup);
module.exports = exports['default'];