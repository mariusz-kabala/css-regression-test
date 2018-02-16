'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _Collapse = require('material-ui/transitions/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _ExpandMore = require('material-ui-icons/ExpandMore');

var _ExpandMore2 = _interopRequireDefault(_ExpandMore);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Card = require('material-ui/Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
  return {
    hidden: {
      display: 'none'
    },
    testCard: {
      position: 'relative',
      minWidth: '240px'
    },
    expandBtn: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 40,
      height: 40,
      fill: '#6e14ff',
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandBtn__open: { transform: 'rotate(180deg)' },
    testCard__subheader_container: {
      padding: '0 16px 16px'
    },
    testCard__subheader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px'
    },
    subHeader__status: {
      marginRight: 16,
      fontSize: '20px',
      fontWeight: 600
    },
    subHeader__status_succeeded: { color: '#149414' },
    subHeader__status_failed: { color: '#e00707' },
    imgsContainer: {
      position: 'relative',
      display: 'flex',
      marginBottom: '16px',
      paddingBottom: '16px',
      width: '100%',
      flexWrap: 'wrap',
      minHeight: '200px',

      '@global': {
        figure: {
          display: 'table',
          margin: 0,
          maxWidth: '100%'
        },
        figcaption: {
          display: 'table-caption',
          captionSide: 'top',
          fontSize: '18px',
          fontWeight: 600,
          color: '#222'
        }
      }
    },
    testImg: {
      flex: '1 1 30%',
      position: 'relative',
      margin: '0 16px 16px 0',
      padding: '8px 8px 8px 0',
      boxSizing: 'border-box'
    },
    testImgLink: {
      fontSize: '12px',
      position: 'absolute',
      bottom: '-4px',
      left: '2px',
      cursor: 'pointer'
    },
    testActions: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: '8px'
    },
    testBtn: {
      background: '#8f42ff',
      borderRadius: 4,
      border: 0,
      color: 'white',
      padding: '8px 24px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)'
    }
  };
};

var TestBlock = function (_React$Component) {
  _inherits(TestBlock, _React$Component);

  function TestBlock(props) {
    _classCallCheck(this, TestBlock);

    var _this = _possibleConstructorReturn(this, (TestBlock.__proto__ || Object.getPrototypeOf(TestBlock)).call(this, props));

    _this.handleExpandClick = function () {
      _this.setState({ expanded: !_this.state.expanded });
    };

    if (props.status == true) {
      _this.state = { expanded: false };
    } else {
      _this.state = { expanded: true };
    }
    return _this;
  }

  _createClass(TestBlock, [{
    key: 'renderSubheader',
    value: function renderSubheader() {
      var _props = this.props,
          classes = _props.classes,
          viewport = _props.viewport,
          url = _props.url,
          misMatchPercentage = _props.misMatchPercentage,
          status = _props.status;


      var disStatus;
      var statusClass;
      if (status == true) {
        disStatus = 'SUCCEEDED';
        statusClass = classes.subHeader__status_succeeded;
      } else {
        disStatus = 'FAILED';
        statusClass = classes.subHeader__status_failed;
      }

      return _react2.default.createElement(
        'div',
        { className: classes.testCard__subheader },
        _react2.default.createElement(
          'span',
          null,
          url,
          ' | ',
          viewport
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: (0, _classnames2.default)(classes.subHeader__status, statusClass) },
            disStatus
          ),
          _react2.default.createElement(
            'span',
            null,
            'Percentage Difference: ',
            misMatchPercentage
          )
        )
      );
    }
  }, {
    key: 'getTargetImageUrl',
    value: function getTargetImageUrl() {
      var _props2 = this.props,
          fileName = _props2.fileName,
          imagePath = _props2.imagePath;

      if (!!imagePath) {
        return imagePath + '/targets/' + fileName;
      }
      return '/api/v1/images/targets/' + fileName;
    }
  }, {
    key: 'getDiffImageUrl',
    value: function getDiffImageUrl() {
      var _props3 = this.props,
          fileName = _props3.fileName,
          testID = _props3.testID,
          imagePath = _props3.imagePath;

      if (!!imagePath) {
        return imagePath + '/diff/' + testID + '/' + fileName;
      }
      return '/api/v1/test-runs/' + testID + '/images/' + fileName + '/diff';
    }
  }, {
    key: 'getTestImageUrl',
    value: function getTestImageUrl() {
      var _props4 = this.props,
          fileName = _props4.fileName,
          testID = _props4.testID,
          imagePath = _props4.imagePath;

      if (!!imagePath) {
        return imagePath + '/tests/' + testID + '/' + fileName;
      }
      return '/api/v1/test-runs/' + testID + '/images/' + fileName + '/test';
    }
  }, {
    key: 'getOpenNewTab',
    value: function getOpenNewTab(img) {
      window.open(img, '_blank');
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this2 = this;

      var _props5 = this.props,
          children = _props5.children,
          classes = _props5.classes,
          testName = _props5.testName,
          rawMisMatchPercentage = _props5.rawMisMatchPercentage,
          hideControls = _props5.hideControls;

      var testImage = this.getTestImageUrl();
      var diffImage = this.getDiffImageUrl();
      var targetImage = this.getTargetImageUrl();

      return _react2.default.createElement(
        _Card2.default,
        { className: classes.testCard },
        _react2.default.createElement(_Card.CardHeader, { title: testName }),
        _react2.default.createElement(
          _Card.CardContent,
          { className: classes.testCard__subheader_container },
          this.renderSubheader()
        ),
        _react2.default.createElement(_ExpandMore2.default, {
          className: (0, _classnames2.default)(classes.expandBtn, (_classNames = {}, _defineProperty(_classNames, classes.expandBtn__open, this.state.expanded), _defineProperty(_classNames, classes.hidden, !!hideControls), _classNames)),
          onClick: this.handleExpandClick
        }),
        _react2.default.createElement(
          _Collapse2.default,
          { 'in': this.state.expanded, transitionDuration: 'auto', unmountOnExit: true },
          _react2.default.createElement(
            _Card.CardContent,
            null,
            _react2.default.createElement(
              'div',
              { className: classes.imgsContainer },
              _react2.default.createElement(
                'div',
                { className: classes.testImg },
                _react2.default.createElement(
                  'figure',
                  null,
                  _react2.default.createElement('img', { src: testImage }),
                  _react2.default.createElement(
                    'figcaption',
                    null,
                    'Test'
                  )
                ),
                _react2.default.createElement(
                  'a',
                  { className: classes.testImgLink,
                    onClick: function onClick() {
                      return _this2.getOpenNewTab(testImage);
                    }
                  },
                  'Open image in new tab'
                )
              ),
              rawMisMatchPercentage != 0 ? _react2.default.createElement(
                'div',
                { className: classes.testImg },
                _react2.default.createElement(
                  'figure',
                  null,
                  _react2.default.createElement('img', { src: diffImage }),
                  _react2.default.createElement(
                    'figcaption',
                    null,
                    'Difference'
                  )
                ),
                _react2.default.createElement(
                  'a',
                  { className: classes.testImgLink,
                    onClick: function onClick() {
                      return _this2.getOpenNewTab(diffImage);
                    }
                  },
                  'Open image in new tab'
                )
              ) : null,
              _react2.default.createElement(
                'div',
                { className: classes.testImg },
                _react2.default.createElement(
                  'figure',
                  null,
                  _react2.default.createElement('img', { src: targetImage }),
                  _react2.default.createElement(
                    'figcaption',
                    null,
                    'Original'
                  )
                ),
                _react2.default.createElement(
                  'a',
                  { className: classes.testImgLink,
                    onClick: function onClick() {
                      return _this2.getOpenNewTab(targetImage);
                    }
                  },
                  'Open image in new tab'
                )
              )
            ),
            _react2.default.createElement(
              _Card.CardActions,
              { className: (0, _classnames2.default)(classes.testActions, _defineProperty({}, classes.hidden, !!hideControls)) },
              _react2.default.createElement(
                _Button2.default,
                { className: classes.testBtn },
                'APPROVE'
              ),
              _react2.default.createElement(
                _Button2.default,
                { className: classes.testBtn },
                'RE-RUN'
              )
            )
          )
        )
      );
    }
  }]);

  return TestBlock;
}(_react2.default.Component);

TestBlock.propTypes = {
  children: _propTypes2.default.node,
  classes: _propTypes2.default.object.isRequired,
  hideControls: _propTypes2.default.bool,
  imagePath: _propTypes2.default.string
};

exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles, {
  name: 'TestBlock'
}))(TestBlock);
module.exports = exports['default'];