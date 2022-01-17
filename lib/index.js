'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _calculator = require('./calculator');

var _calculator2 = _interopRequireDefault(_calculator);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _expressionParser = require('@pie-framework/expression-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var log = (0, _debug2.default)('@pie-framework:material-ui-calculator');

var evaluate = function evaluate(expr, am) {
  try {
    log('evaluate: ', expr, am);
    var angleMode = am === 'deg' ? _expressionParser.AngleMode.DEGREES : _expressionParser.AngleMode.RADIANS;
    log('evaluate: angleMode: ', angleMode);
    return (0, _expressionParser.calculate)(expr, { angleMode: angleMode });
  } catch (e) {
    log('error: ', e.message);
    return { value: '', error: e };
  }
};

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.onEvaluate = function (expression) {
      log('onEvaluate: state: ', _this.state);
      var result = evaluate(expression, _this.state.angleMode);

      if (_this.props.onEvaluationComplete && !result.error) {
        _this.props.onEvaluationComplete(expression, result.value);
      }

      _this.setState({
        expr: (result.value || result.value === 0 ? result.value : expression).toString(),
        error: result.error
      });
    };

    _this.onAngleModeChange = function (angleMode) {
      _this.setState({ angleMode: angleMode });
    };

    _this.onClearError = function () {
      if (_this.state.error) {
        _this.setState({ error: undefined });
      }
    };

    _this.state = {
      expr: '',
      angleMode: 'rad'
    };
    return _this;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var mode = this.props.mode;
      var _state = this.state,
          expr = _state.expr,
          angleMode = _state.angleMode,
          error = _state.error;

      return _react2.default.createElement(_calculator2.default, {
        mode: mode,
        angleMode: angleMode,
        onAngleModeChange: this.onAngleModeChange,
        expr: expr,
        error: error,
        onClearError: this.onClearError,
        onEvaluate: this.onEvaluate
      });
    }
  }]);

  return Main;
}(_react2.default.Component);

Main.propTypes = {
  mode: _propTypes2.default.oneOf(['basic', 'scientific']).isRequired,
  onEvaluationComplete: _propTypes2.default.func
};
exports.default = Main;