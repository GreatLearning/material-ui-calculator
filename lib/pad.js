'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pad = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pad = exports.Pad = function Pad(props) {
  var label = props.label,
      classes = props.classes,
      theme = props.theme,
      style = props.style,
      value = props.value,
      onClick = props.onClick;

  var names = (0, _classnames2.default)(classes.pad, theme && theme.root);
  var handleClick = function handleClick() {
    onClick(value);
  };

  return _react2.default.createElement(
    'div',
    { style: style, className: names },
    _react2.default.createElement(
      _Button2.default,
      { tabIndex: '-1', className: classes.button, onClick: handleClick },
      label
    )
  );
};

Pad.propTypes = {
  label: _propTypes2.default.string.isRequired,
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object,
  style: _propTypes2.default.object,
  value: _propTypes2.default.string.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(function () {
  return {
    pad: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      fontSize: 'inherit'
    },
    button: {
      color: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'inherit'
    }
  };
})(Pad);