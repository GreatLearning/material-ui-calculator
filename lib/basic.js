'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Basic = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pad = require('./pad');

var _pad2 = _interopRequireDefault(_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var items = [{ label: 'C', value: 'clear', kind: 'operator' }, { label: '←', value: 'backspace', kind: 'operator' }, { label: '±', value: 'plus-minus', kind: 'operator' }, { label: '÷', value: '/', kind: 'operator' }, { label: '(', value: '(' }, { label: ')', value: ')' }, { label: '%', value: '%' }, { label: '×', value: '*', kind: 'operator' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '-', value: '-', kind: 'operator' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '+', value: '+', kind: 'operator' }, { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '0', value: '0' }, { label: '.', value: '.' }, { label: '=', value: 'equals', kind: 'operator' }];

var Basic = exports.Basic = function (_React$Component) {
  _inherits(Basic, _React$Component);

  function Basic() {
    _classCallCheck(this, Basic);

    return _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).apply(this, arguments));
  }

  _createClass(Basic, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          onInput = _props.onInput,
          className = _props.className;


      var names = (0, _classnames2.default)(classes.pad, className);

      return _react2.default.createElement(
        'div',
        { className: names },
        items.map(function (i, index) {
          var positionStyle = {};
          if (i.label === '0') positionStyle = { gridColumn: '1/3' };else if (i.label === '=') positionStyle = {
            gridRow: '5/7',
            gridColumn: '4/5'
          };

          return _react2.default.createElement(_pad2.default, _extends({
            key: index,
            style: positionStyle,
            theme: {
              root: classes[i.kind]
            }
          }, i, {
            onClick: onInput
          }));
        })
      );
    }
  }]);

  return Basic;
}(_react2.default.Component);

Basic.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  onInput: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string
};
exports.default = (0, _styles.withStyles)(function (theme) {
  return {
    pad: {
      flex: 0.5,
      gridGap: '4px',
      width: '100%',
      display: 'grid',
      fontSize: 'inherit',
      gridTemplateColumns: 'repeat(4, 1fr)'
    },
    operator: {
      backgroundColor: 'rgba(255,255,255,0.2)'
    }
  };
})(Basic);