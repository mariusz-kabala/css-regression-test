'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestRunsList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('material-ui/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Input = require('material-ui/Input');

var _Input2 = _interopRequireDefault(_Input);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('material-ui/styles');

var _reactRedux = require('react-redux');

var _testRuns = require('../actions/testRuns');

var _goToTest = require('../actions/goToTest');

var _reactRouter = require('react-router');

var _ListSubheader = require('material-ui/List/ListSubheader');

var _ListSubheader2 = _interopRequireDefault(_ListSubheader);

var _List = require('material-ui/List');

var _List2 = _interopRequireDefault(_List);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    customWidth: {
      width: 230,
      margin: 10
    },
    testRunLabel: {
      margin: 8,
      fontSize: 12
    },
    menuList: {
      width: '100%',
      maxWidth: 360
    }
  };
};

var TestRunsList = exports.TestRunsList = function (_React$Component) {
  _inherits(TestRunsList, _React$Component);

  function TestRunsList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TestRunsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TestRunsList.__proto__ || Object.getPrototypeOf(TestRunsList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      anchorEl: null
    }, _this.handleClickListItem = function (event) {
      _this.setState({ anchorEl: event.currentTarget });
    }, _this.handleClose = function () {
      _this.setState({ anchorEl: null });
    }, _this.handleChange = function (event, index) {
      var _this$props = _this.props,
          history = _this$props.history,
          onGoToTest = _this$props.onGoToTest,
          testRuns = _this$props.testRuns;


      if (typeof onGoToTest === 'function') {
        onGoToTest(testRuns[event.target.value], history);
      }
      _this.setState({ anchorEl: null });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TestRunsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReady = this.props.onReady;


      if (typeof onReady === 'function') {
        onReady();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          testRuns = _props.testRuns,
          classes = _props.classes,
          selectedTestRun = _props.selectedTestRun;
      var anchorEl = this.state.anchorEl;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _List2.default,
          { component: 'nav' },
          _react2.default.createElement(
            _List.ListItem,
            {
              button: true,
              'aria-haspopup': 'true',
              'aria-controls': 'lock-menu',
              'aria-label': 'Choose test run',
              onClick: this.handleClickListItem
            },
            _react2.default.createElement(_List.ListItemText, {
              primary: 'Selected test run',
              secondary: selectedTestRun || 'Choose test run'
            })
          )
        ),
        _react2.default.createElement(
          _Menu2.default,
          {
            anchorEl: anchorEl,
            open: Boolean(anchorEl),
            onClose: this.handleClose,
            className: classes.menuList
          },
          testRuns.map(function (testRun) {
            return _react2.default.createElement(
              _Menu.MenuItem,
              {
                key: 'id-' + testRun,
                value: testRun,
                selected: testRun === selectedTestRun,
                onClick: _this2.handleChange
              },
              testRun
            );
          })
        )
      );
    }
  }]);

  return TestRunsList;
}(_react2.default.Component);

TestRunsList.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  onReady: _propTypes2.default.func,
  onGoToTest: _propTypes2.default.func,
  testRuns: _propTypes2.default.array.isRequired,
  isLoading: _propTypes2.default.bool.isRequired,
  selectedTestRun: _propTypes2.default.string
};

exports.default = (0, _compose2.default)(_reactRouter.withRouter, (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(function (state) {
  return {
    isLoading: state.isLoading.testRuns,
    testRuns: state.testRuns,
    selectedTestRun: state.currentTestDetailsID
  };
}, function (dispatch) {
  return {
    onReady: function onReady() {
      return dispatch((0, _testRuns.fetchTestRunsListIfNeeded)());
    },
    onGoToTest: function onGoToTest(testID, history) {
      return dispatch((0, _goToTest.goToTestDetailsIfNeeded)(testID, history));
    }
  };
}))(TestRunsList);