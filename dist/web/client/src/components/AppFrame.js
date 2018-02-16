'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _styles = require('material-ui/styles');

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('material-ui/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Tooltip = require('material-ui/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Menu = require('material-ui-icons/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _LightbulbOutline = require('material-ui-icons/LightbulbOutline');

var _LightbulbOutline2 = _interopRequireDefault(_LightbulbOutline);

var _FormatTextdirectionLToR = require('material-ui-icons/FormatTextdirectionLToR');

var _FormatTextdirectionLToR2 = _interopRequireDefault(_FormatTextdirectionLToR);

var _FormatTextdirectionRToL = require('material-ui-icons/FormatTextdirectionRToL');

var _FormatTextdirectionRToL2 = _interopRequireDefault(_FormatTextdirectionRToL);

var _AppDrawer = require('./AppDrawer');

var _AppDrawer2 = _interopRequireDefault(_AppDrawer);

var _helpers = require('../utils/helpers');

var _NewTestRunPopup = require('./NewTestRunPopup');

var _NewTestRunPopup2 = _interopRequireDefault(_NewTestRunPopup);

var _ProcessesInfo = require('./ProcessesInfo');

var _ProcessesInfo2 = _interopRequireDefault(_ProcessesInfo);

var _io = require('../actions/io');

var _scheduleNewTestRun = require('../actions/scheduleNewTestRun');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable flowtype/require-valid-file-annotation */

// @todo Disaply a progress bar between route transitions
_nprogress2.default.configure({
  template: '\n    <div class="bar" role="bar">\n      <dt></dt>\n      <dd></dd>\n    </div>\n  '
});

var styles = function styles(theme) {
  return {
    '@global': {
      html: {
        fontFamily: 'Lato, sans-serif',
        fontWeight: '200',
        color: '#222',
        background: theme.palette.background.default,
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        boxSizing: 'border-box',
        '@media print': {
          background: theme.palette.common.white
        }
      },
      '*, *:before, *:after': {
        boxSizing: 'inherit'
      },
      body: {
        margin: 0
      },
      '#nprogress': {
        pointerEvents: 'none',
        '& .bar': {
          position: 'fixed',
          background: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
          borderRadius: 1,
          zIndex: theme.zIndex.tooltip,
          top: 0,
          left: 0,
          width: '100%',
          height: 2
        },
        '& dd, & dt': {
          position: 'absolute',
          top: 0,
          height: 2,
          boxShadow: (theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white) + ' 1px 0 6px 1px',
          borderRadius: '100%',
          animation: 'nprogress-pulse 2s ease-out 0s infinite'
        },
        '& dd': {
          opacity: 0.6,
          width: 20,
          right: 0,
          clip: 'rect(-6px,22px,14px,10px)'
        },
        '& dt': {
          opacity: 0.6,
          width: 180,
          right: -80,
          clip: 'rect(-6px,90px,14px,-6px)'
        }
      },
      '@keyframes nprogress-pulse': {
        '30%': { opacity: 0.6 },
        '60%': { opacity: 0 },
        to: { opacity: 0.6 }
      }
    },
    root: {
      display: 'relative',
      minHeight: '100vh',
      width: '100%',
      padding: '96px 40px'
    },
    title: {
      marginLeft: 24
    },
    appBar: {
      background: 'linear-gradient(60deg, #8f42ff 40%, #c099ff 80%)',
      transition: theme.transitions.create('width'),
      zIndex: '10',
      '@media print': {
        position: 'absolute'
      }
    },
    appBarHome: {
      boxShadow: 'none'
    },
    appBarShift: _defineProperty({}, theme.breakpoints.up('lg'), {
      width: 'calc(100% - 250px)'
    }),
    drawer: _defineProperty({}, theme.breakpoints.up('lg'), {
      width: 250
    }),
    navIconHide: _defineProperty({}, theme.breakpoints.up('lg'), {
      display: 'none'
    }),
    button: {
      marginLeft: '30px'
    }
  };
};

var AppFrame = function (_React$Component) {
  _inherits(AppFrame, _React$Component);

  function AppFrame() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AppFrame);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppFrame.__proto__ || Object.getPrototypeOf(AppFrame)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mobileOpen: false
    }, _this.handleDrawerToggle = function () {
      _this.setState({ mobileOpen: !_this.state.mobileOpen });
    }, _this.handleStartNewTest = function (event) {
      var onStartNewTestRunButtonClick = _this.props.onStartNewTestRunButtonClick;


      onStartNewTestRunButtonClick();

      event.preventDefault();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AppFrame, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReady = this.props.onReady;


      onReady();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          isNewTestRunPopupOpen = _props.isNewTestRunPopupOpen;


      var uiTheme = {
        paletteType: 'light',
        direction: 'ltr'
      };

      var title = null;
      //  this.context.activePage.title !== false ? pageToTitle(this.context.activePage) : null;

      var disablePermanent = false;
      var navIconClassName = '';
      var appBarClassName = classes.appBar;

      if (title === null) {
        // home route, don't shift app bar or dock drawer
        disablePermanent = true;
        appBarClassName += ' ' + classes.appBarHome;
      } else {
        navIconClassName = classes.navIconHide;
        appBarClassName += ' ' + classes.appBarShift;
      }

      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _AppBar2.default,
          { className: appBarClassName },
          _react2.default.createElement(
            _Toolbar2.default,
            null,
            _react2.default.createElement(
              _IconButton2.default,
              {
                color: 'contrast',
                'aria-label': 'open drawer',
                onClick: this.handleDrawerToggle,
                className: navIconClassName
              },
              _react2.default.createElement(_Menu2.default, null)
            ),
            _react2.default.createElement(
              _Typography2.default,
              { className: classes.title, type: 'title', color: 'inherit', noWrap: true },
              'CSS Regression Tests'
            ),
            _react2.default.createElement(
              _Button2.default,
              {
                onClick: this.handleStartNewTest,
                color: 'primary',
                raised: true,
                className: classes.button
              },
              'Start new test'
            ),
            _react2.default.createElement(_ProcessesInfo2.default, null)
          )
        ),
        _react2.default.createElement(_AppDrawer2.default, {
          className: classes.drawer,
          disablePermanent: disablePermanent,
          onClose: this.handleDrawerToggle,
          mobileOpen: this.state.mobileOpen
        }),
        children,
        _react2.default.createElement(_NewTestRunPopup2.default, { open: isNewTestRunPopupOpen })
      );
    }
  }]);

  return AppFrame;
}(_react2.default.Component);

AppFrame.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.object.isRequired,
  isNewTestRunPopupOpen: _propTypes2.default.bool.isRequired,
  onReady: _propTypes2.default.func.isRequired,
  onStartNewTestRunButtonClick: _propTypes2.default.func.isRequired
};

exports.default = (0, _compose2.default)(_reactRouter.withRouter, (0, _styles.withStyles)(styles, {
  name: 'AppFrame'
}), (0, _reactRedux.connect)(function (state) {
  return {
    isNewTestRunPopupOpen: state.isNewTestRunPopupOpen
  };
}, function (dispatch) {
  return {
    onReady: function onReady() {
      return dispatch((0, _io.connectToSocket)());
    },
    onStartNewTestRunButtonClick: function onStartNewTestRunButtonClick() {
      return dispatch((0, _scheduleNewTestRun.openNewTestRunPopup)());
    }
  };
}))(AppFrame);
module.exports = exports['default'];