'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _List = require('material-ui/List');

var _List2 = _interopRequireDefault(_List);

var _Toolbar = require('material-ui/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Hidden = require('material-ui/Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

var _AppDrawerNavItem = require('./AppDrawerNavItem');

var _AppDrawerNavItem2 = _interopRequireDefault(_AppDrawerNavItem);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _helpers = require('../utils/helpers');

var _init = require('../actions/init');

var _TestRunsList = require('./TestRunsList');

var _TestRunsList2 = _interopRequireDefault(_TestRunsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    paper: {
      width: 250,
      backgroundColor: theme.palette.background.paper
    },
    title: {
      color: theme.palette.text.secondary,
      '&:hover': {
        color: theme.palette.primary[500]
      }
    },
    toolbarIe11: {
      display: 'flex'
    },
    toolbar: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    anchor: {
      color: theme.palette.text.secondary
    }
  };
};

function renderNavItems(props, pages, activePage) {
  var navItems = null;

  if (pages && pages.length) {
    // eslint-disable-next-line no-use-before-define
    navItems = pages.reduce(reduceChildRoutes.bind(null, props, activePage), []);
  }

  return _react2.default.createElement(
    _List2.default,
    null,
    navItems
  );
}

function reduceChildRoutes(props, activePage, items, childPage, index) {
  if (childPage.children && childPage.children.length > 1) {
    var openImmediately = activePage.pathname.indexOf(childPage.pathname) !== -1 || false;

    items.push(_react2.default.createElement(
      _AppDrawerNavItem2.default,
      {
        key: index,
        openImmediately: openImmediately,
        title: (0, _helpers.pageToTitle)(childPage)
      },
      renderNavItems(props, childPage.children, activePage)
    ));
  } else if (childPage.title !== false) {
    childPage = childPage.children && childPage.children.length === 1 ? childPage.children[0] : childPage;

    items.push(_react2.default.createElement(_AppDrawerNavItem2.default, {
      key: index,
      title: (0, _helpers.pageToTitle)(childPage),
      href: childPage.pathname,
      onClick: props.onClose
    }));
  }

  return items;
}

var AppDrawer = function (_React$Component) {
  _inherits(AppDrawer, _React$Component);

  function AppDrawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AppDrawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppDrawer.__proto__ || Object.getPrototypeOf(AppDrawer)).call.apply(_ref, [this].concat(args))), _this), _this.getHandleScenarioClick = function (id) {
      return function (event) {
        event.preventDefault();

        console.log('go to scenario', id);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AppDrawer, [{
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
          classes = _props.classes,
          className = _props.className,
          disablePermanent = _props.disablePermanent,
          mobileOpen = _props.mobileOpen,
          onClose = _props.onClose,
          scenarios = _props.scenarios;

      var used = [];

      var items = scenarios.map(function (scenario, key) {
        if (used.indexOf(scenario.name) === -1) {
          used.push(scenario.name);

          return _react2.default.createElement(_AppDrawerNavItem2.default, {
            key: 'scenario-' + key,
            title: scenario.name,
            onClick: _this2.getHandleScenarioClick(key)
          });
        }
      });

      var drawer = _react2.default.createElement(
        'div',
        { className: classes.nav },
        _react2.default.createElement(
          'div',
          { className: classes.toolbarIe11 },
          _react2.default.createElement(
            _Toolbar2.default,
            { className: classes.toolbar },
            _react2.default.createElement(
              _Typography2.default,
              { type: 'title', gutterBottom: true, color: 'inherit' },
              'SCENARIOS'
            ),
            _react2.default.createElement(
              _Typography2.default,
              { type: 'caption' },
              'CSS Regression tests'
            ),
            _react2.default.createElement(_Divider2.default, { absolute: true })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_TestRunsList2.default, null)
        ),
        _react2.default.createElement(
          _List2.default,
          null,
          _react2.default.createElement(
            _AppDrawerNavItem2.default,
            { title: 'Defined scenarios' },
            _react2.default.createElement(
              'ul',
              null,
              items
            )
          )
        )
      );

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          _Hidden2.default,
          { lgUp: !disablePermanent },
          _react2.default.createElement(
            _Drawer2.default,
            {
              classes: {
                paper: (0, _classnames2.default)(classes.paper, 'algolia-drawer')
              },
              type: 'temporary',
              open: mobileOpen,
              onClose: onClose,
              ModalProps: {
                keepMounted: true
              }
            },
            drawer
          )
        ),
        disablePermanent ? null : _react2.default.createElement(
          _Hidden2.default,
          { lgDown: true, implementation: 'css' },
          _react2.default.createElement(
            _Drawer2.default,
            {
              classes: {
                paper: classes.paper
              },
              type: 'permanent',
              open: true
            },
            drawer
          )
        )
      );
    }
  }]);

  return AppDrawer;
}(_react2.default.Component);

AppDrawer.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string,
  disablePermanent: _propTypes2.default.bool.isRequired,
  mobileOpen: _propTypes2.default.bool.isRequired,
  onClose: _propTypes2.default.func.isRequired,
  onReady: _propTypes2.default.func
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles), (0, _reactRedux.connect)(function (state) {
  return {
    scenarios: state.scenarios
  };
}, function (dispatch) {
  return {
    onReady: function onReady() {
      return dispatch((0, _init.fetchScenariosListIfNeeded)());
    }
  };
}))(AppDrawer);
module.exports = exports['default'];