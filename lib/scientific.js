'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scientific = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _pad = require('./pad');

var _pad2 = _interopRequireDefault(_pad);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _symbols = require('./symbols');

var _colors = require('./colors');

var colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var items = ['(', ')', _symbols.Inputs.PI, _symbols.LogInput.LOG, _symbols.AngleInput.SIN, _symbols.AngleInput.COS, _symbols.AngleInput.TAN, _symbols.LogInput.NATURAL_LOG, _symbols.AngleInput.ASIN, _symbols.AngleInput.ACOS, _symbols.AngleInput.ATAN, { label: 'n!', value: '!' }, { label: '√', value: _symbols.UnaryInput.SQUARE_ROOT }, { label: 'x²', value: _symbols.UnaryInput.SQUARE }, { label: 'x³', value: _symbols.UnaryInput.CUBE }, { label: 'x<sup>y</sup>', value: '^' }, _symbols.Inputs.FRACTION, _symbols.Inputs.EXPONENT, _symbols.UnaryInput.ABS];

var Scientific = exports.Scientific = function (_React$Component) {
  _inherits(Scientific, _React$Component);

  function Scientific() {
    _classCallCheck(this, Scientific);

    return _possibleConstructorReturn(this, (Scientific.__proto__ || Object.getPrototypeOf(Scientific)).apply(this, arguments));
  }

  _createClass(Scientific, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onInput = _props.onInput,
          classes = _props.classes,
          activeMode = _props.activeMode;

      return _react2.default.createElement(
        'div',
        { className: classes.scientific },
        items.map(function (i, index) {
          var props = typeof i === 'string' ? { label: i, value: i } : i;
          var active = props.label === activeMode;
          return _react2.default.createElement(_pad2.default, _extends({
            theme: {
              root: (0, _classnames2.default)(i && classes[i.kind], active && classes.active)
            },
            active: props.label === activeMode,
            onClick: onInput,
            key: index
          }, props));
        })
      );
    }
  }]);

  return Scientific;
}(_react2.default.Component);

Scientific.propTypes = {
  onInput: _propTypes2.default.func.isRequired,
  classes: _propTypes2.default.object.isRequired,
  activeMode: _propTypes2.default.oneOf(['deg', 'rad'])
};


Scientific.propTypes = {};

var styles = function styles() {
  return {
    scientific: {
      paddingLeft: '1px',
      display: 'grid',
      gridGap: '1px',
      flex: 0.5,
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)(Scientific);