'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _TestDetails = require('../web/client/src/components/TestDetails');

var _TestDetails2 = _interopRequireDefault(_TestDetails);

var _jss = require('react-jss/lib/jss');

var _JssProvider = require('react-jss/lib/JssProvider');

var _JssProvider2 = _interopRequireDefault(_JssProvider);

var _styles = require('material-ui/styles');

var _colors = require('material-ui/colors');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var WrappedComponent = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'TestDetailsContainer'
}))(_TestDetails2.default);

exports.default = function (id, results) {
  var sheetsRegistry = new _jss.SheetsRegistry();

  // Create a theme instance.
  var theme = (0, _styles.createMuiTheme)({
    palette: {
      primary: _colors.green,
      accent: _colors.red,
      type: 'light'
    }
  });

  var generateClassName = (0, _styles.createGenerateClassName)();

  var html = _server2.default.renderToString(_react2.default.createElement(
    _JssProvider2.default,
    { registry: sheetsRegistry, generateClassName: generateClassName },
    _react2.default.createElement(
      _styles.MuiThemeProvider,
      { theme: theme, sheetsManager: new Map() },
      _react2.default.createElement(WrappedComponent, {
        summary: results.summary,
        details: results.details,
        onReady: undefined,
        match: { params: { id: id } }
      })
    )
  ));

  var css = sheetsRegistry.toString();

  return (0, _template2.default)(html, css);
};

module.exports = exports['default'];