'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenariosContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _styles = require('material-ui/styles');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Table = require('material-ui/Table');

var _Table2 = _interopRequireDefault(_Table);

var _ExpansionPanel = require('material-ui/ExpansionPanel');

var _ExpansionPanel2 = _interopRequireDefault(_ExpansionPanel);

var _GridList = require('material-ui/GridList');

var _ExpandMore = require('material-ui-icons/ExpandMore');

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Info = require('material-ui-icons/Info');

var _Info2 = _interopRequireDefault(_Info);

var _ListSubheader = require('material-ui/List/ListSubheader');

var _ListSubheader2 = _interopRequireDefault(_ListSubheader);

var _lodash = require('lodash');

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _scheduleNewTestRun = require('../actions/scheduleNewTestRun');

var _GenerateNewTargetPopup = require('../components/GenerateNewTargetPopup');

var _GenerateNewTargetPopup2 = _interopRequireDefault(_GenerateNewTargetPopup);

var _generateNewTarget = require('../actions/generateNewTarget');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    urlsList: {
      margin: '0 0 15px 0',
      padding: 0,
      'list-style-type': 'none'
    },
    url: {
      fontSize: '12px',
      color: '#fff',
      padding: '3px',
      background: '#A36EFB',
      marginRight: '5px',
      display: 'inline-block'
    },
    panel: {
      marginBottom: '10px'
    },
    detailsContainer: {
      display: 'table',
      width: '100%'
    },
    detailsEl: {
      display: 'table-cell',
      width: '50%',
      verticalAlign: 'top'
    },
    targetImage: {
      maxWidth: '500px'
    }
  };
};

var ScenariosContainer = exports.ScenariosContainer = function (_React$Component) {
  _inherits(ScenariosContainer, _React$Component);

  function ScenariosContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ScenariosContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScenariosContainer.__proto__ || Object.getPrototypeOf(ScenariosContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: null
    }, _this.handleChange = function (panel) {
      return function (event, expanded) {
        _this.setState({
          expanded: expanded ? panel : null
        });
      };
    }, _this.handleGenerateTargetImageClick = function (event) {
      event.preventDefault();

      var onGenerateTargetImageClick = _this.props.onGenerateTargetImageClick;


      onGenerateTargetImageClick();
    }, _this.handleRunTestClick = function (event) {
      event.preventDefault();

      var onRunTestClick = _this.props.onRunTestClick;


      onRunTestClick();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ScenariosContainer, [{
    key: 'renderImages',
    value: function renderImages(images) {
      var classes = this.props.classes;


      return _react2.default.createElement(
        _GridList.GridList,
        { cellHeight: 180 },
        images.map(function (image) {
          return _react2.default.createElement(
            _GridList.GridListTile,
            { key: image.file },
            _react2.default.createElement('img', {
              className: classes.targetImage,
              src: '/api/v1/images/targets/' + image.file,
              alt: image.url + ' / ' + image.res
            }),
            _react2.default.createElement(_GridList.GridListTileBar, {
              title: image.url,
              subtitle: image.res,
              actionIcon: _react2.default.createElement(
                _IconButton2.default,
                null,
                _react2.default.createElement(_Info2.default, null)
              )
            })
          );
        })
      );
    }
  }, {
    key: 'renderUrls',
    value: function renderUrls(urls) {
      var classes = this.props.classes;


      return _react2.default.createElement(
        'ul',
        { className: classes.urlsList },
        urls.map(function (url, key) {
          return _react2.default.createElement(
            'li',
            { className: classes.url, key: 'url-' + key },
            url
          );
        })
      );
    }
  }, {
    key: 'renderObjectTodo',
    value: function renderObjectTodo(todo) {
      return _react2.default.createElement(
        _Table2.default,
        null,
        _react2.default.createElement(
          _Table.TableBody,
          null,
          Object.keys(todo).map(function (key, index) {
            return _react2.default.createElement(
              _Table.TableRow,
              { key: 'todo-' + index },
              _react2.default.createElement(
                _Table.TableCell,
                null,
                key
              ),
              _react2.default.createElement(
                _Table.TableCell,
                null,
                todo[key]
              )
            );
          })
        )
      );
    }
  }, {
    key: 'renderArrayTodo',
    value: function renderArrayTodo(todo) {}
  }, {
    key: 'renderTodo',
    value: function renderTodo(todo) {
      return (0, _lodash.isObject)(todo) ? this.renderObjectTodo(todo) : this.renderArrayTodo(todo);
    }
  }, {
    key: 'renderTest',
    value: function renderTest(test) {
      var expanded = this.state.expanded;
      var classes = this.props.classes;

      return _react2.default.createElement(
        _ExpansionPanel2.default,
        {
          key: 'test-' + test.name,
          expanded: expanded === test.name,
          onChange: this.handleChange(test.name)
        },
        _react2.default.createElement(
          _ExpansionPanel.ExpansionPanelSummary,
          { expandIcon: _react2.default.createElement(_ExpandMore2.default, null) },
          _react2.default.createElement(
            _Typography2.default,
            { type: 'subheading' },
            test.name
          )
        ),
        _react2.default.createElement(
          _ExpansionPanel.ExpansionPanelDetails,
          null,
          _react2.default.createElement(
            'div',
            { className: classes.detailsContainer },
            _react2.default.createElement(
              'div',
              { className: classes.detailsEl },
              this.renderTodo(test.todo)
            ),
            _react2.default.createElement(
              'div',
              { className: classes.detailsEl },
              this.renderImages(test.images)
            )
          )
        ),
        _react2.default.createElement(
          _ExpansionPanel.ExpansionPanelActions,
          null,
          _react2.default.createElement(
            _Button2.default,
            {
              onClick: this.handleGenerateTargetImageClick,
              raised: true,
              color: 'primary'
            },
            'Generate new target images'
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              raised: true,
              color: 'accent',
              onClick: this.handleRunTestClick
            },
            'Run this test'
          )
        )
      );
    }
  }, {
    key: 'renderScenario',
    value: function renderScenario(scenario) {
      var _this2 = this;

      var classes = this.props.classes;


      return _react2.default.createElement(
        'div',
        { className: classes.panel, key: 'scenario-' + scenario.name },
        _react2.default.createElement(
          _Typography2.default,
          { type: 'headline' },
          scenario.name
        ),
        this.renderUrls(scenario.urls),
        scenario.tests.map(function (test) {
          return _this2.renderTest(test);
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var scenarios = this.props.scenarios;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Typography2.default,
          { type: 'display1', gutterBottom: true, color: 'inherit' },
          'Scenarios:'
        ),
        scenarios.map(function (scenario) {
          return _this3.renderScenario(scenario);
        }),
        _react2.default.createElement(_GenerateNewTargetPopup2.default, null)
      );
    }
  }]);

  return ScenariosContainer;
}(_react2.default.Component);

ScenariosContainer.propTypes = {
  onRunTestClick: _propTypes2.default.func.isRequired,
  onGenerateTargetImageClick: _propTypes2.default.func.isRequired,
  scenarios: _propTypes2.default.array.isRequired
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'Scenarios'
}), (0, _reactRedux.connect)(function (state) {
  return {
    scenarios: state.scenarios
  };
}, function (dispatch) {
  return {
    onRunTestClick: function onRunTestClick() {
      dispatch((0, _scheduleNewTestRun.openNewTestRunPopup)());
    },
    onGenerateTargetImageClick: function onGenerateTargetImageClick() {
      dispatch((0, _generateNewTarget.openGenerateNewTargetPopup)());
    }
  };
}))(ScenariosContainer);