'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Display = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _colors = require('./colors');

var colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Display = exports.Display = function (_React$Component) {
  _inherits(Display, _React$Component);

  function Display() {
    _classCallCheck(this, Display);

    return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).apply(this, arguments));
  }

  _createClass(Display, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          children = _props.children,
          focused = _props.focused,
          error = _props.error;


      var names = (0, _classnames2.default)(classes.display, focused && classes.focused, error && classes.error);
      return _react2.default.createElement(
        'div',
        { className: names },
        _react2.default.createElement(
          'div',
          { className: classes.expr },
          children,
          ' '
        )
      );
    }
  }]);

  return Display;
}(_react2.default.Component);

Display.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]).isRequired,
  focused: _propTypes2.default.bool,
  error: _propTypes2.default.object
};


var styles = function styles(theme) {
  return {
    display: {
      display: 'flex',
      backgroundColor: 'transparent',
      padding: theme.spacing.unit * 2,
      transition: 'background-color 200ms linear',
      textAlign: 'right',
      position: 'relative',
      boxShadow: '0 3px 3px rgba(0, 0, 0, 0.1)',
      border: 'solid 1px rgba(255,255,255,0)',
      borderRadius: '4px',
      minHeight: '128px',
      marginBottom: '12px'
    },
    focused: {
      border: 'solid 1px rgba(255,255,255,1.0)'
    },
    error: {},
    expr: {
      flex: 1,
      paddingLeft: theme.spacing.unit
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)(Display);