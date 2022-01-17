'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calculator = exports.SelectableInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _selectableInput = require('./selectable-input');

var _selectableInput2 = _interopRequireDefault(_selectableInput);

var _scientific = require('./scientific');

var _scientific2 = _interopRequireDefault(_scientific);

var _utils = require('./utils');

var _mathInput = require('./math-input');

var _styles = require('@material-ui/core/styles');

var _basic = require('./basic');

var _basic2 = _interopRequireDefault(_basic);

var _display = require('./display');

var _display2 = _interopRequireDefault(_display);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _colors = require('./colors');

var colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.SelectableInput = _selectableInput2.default;


var log = (0, _debug2.default)('@pie-framework:material-ui-calculator');

var Calculator = exports.Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.onChange = function (e) {
      _this.props.onClearError();
      _this.setState({
        expr: e.target.value,
        selectionStart: e.target.selectionStart,
        selectionEnd: e.target.selectionEnd,
        superscript: e.target.superscript
      });
    };

    _this.onSelectionChange = function (update) {
      _this.setState({
        selectionStart: update.selectionStart,
        selectionEnd: update.selectionEnd
      });
    };

    _this.onInput = function (value) {
      log('[onInput]: ', value);
      var _this$state = _this.state,
          expr = _this$state.expr,
          selectionStart = _this$state.selectionStart,
          selectionEnd = _this$state.selectionEnd,
          superscript = _this$state.superscript;


      if (value === 'equals') {
        var onEvaluate = _this.props.onEvaluate;

        onEvaluate(expr);
        _this.input.focus();
        return;
      }

      var result = (0, _mathInput.handleInput)(value, expr, selectionStart, selectionEnd, superscript);

      if (result) {
        if (result.passthrough) {
          _this.setState({
            expr: (0, _utils.insertAt)(expr, { start: selectionStart, end: selectionEnd }, value),
            selectionStart: selectionStart + value.length,
            selectionEnd: selectionEnd + value.length,
            superscript: superscript
          });
        } else {
          _this.setState({
            expr: result.value,
            selectionStart: result.selectionStart,
            selectionEnd: result.selectionEnd,
            superscript: result.superscript
          });
        }
      }
      _this.input.focus();
    };

    _this.onFocus = function () {
      _this.setState({ focused: true });
    };

    _this.onBlur = function () {
      _this.setState({ focused: false });
    };

    _this.onKeyDown = function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'a' && e.metaKey || e.key === 'Tab' || e.key === 'Backspace') {
        return;
      }

      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        e.stopPropagation();
        log('ENTER');
        var _expr = _this.state.expr;
        var onEvaluate = _this.props.onEvaluate;

        onEvaluate(_expr);
        return;
      }

      log('[onKeyDown] e.key', e.key);
      var _this$state2 = _this.state,
          selectionStart = _this$state2.selectionStart,
          selectionEnd = _this$state2.selectionEnd,
          superscript = _this$state2.superscript,
          expr = _this$state2.expr;

      var result = (0, _mathInput.handleInput)(e.key, expr, selectionStart, selectionEnd, superscript);
      log('[onKeyDown] result: ', result);

      if (result && result.passthrough) {
        /**
         * just let the input handle the keydown - this will go through onChange
         */
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (result) {
        _this.setState({
          expr: result.value,
          selectionStart: result.selectionStart,
          selectionEnd: result.selectionEnd,
          superscript: result.superscript
        });
      }
    };

    _this.state = {
      expr: props.expr,
      selectionStart: 0,
      selectionEnd: 0
    };
    return _this;
  }

  _createClass(Calculator, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var expr = nextProps.expr,
          error = nextProps.error;

      log('[componentWilReceiveProps] expr: ', expr, this.state.expr);

      log('error: ', error, this.props.error);
      if (error !== this.props.error) {
        return;
      }

      if (expr !== this.state.expr) {
        this.setState({
          expr: expr,
          selectionStart: expr.length,
          selectionEnd: expr.length
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          mode = _props.mode,
          angleMode = _props.angleMode,
          onAngleModeChange = _props.onAngleModeChange,
          error = _props.error;
      var _state = this.state,
          expr = _state.expr,
          selectionStart = _state.selectionStart,
          selectionEnd = _state.selectionEnd,
          superscript = _state.superscript,
          focused = _state.focused;


      var names = (0, _classnames2.default)(classes.calculator, mode === 'scientific' ? classes.scientificCalculator : classes.basicCalculator);
      return _react2.default.createElement(
        'div',
        { className: names },
        _react2.default.createElement(
          _display2.default,
          {
            angleMode: angleMode,
            showAngleMode: mode === 'scientific',
            onAngleModeChange: onAngleModeChange,
            focused: focused,
            error: error
          },
          _react2.default.createElement(_selectableInput2.default, {
            className: classes.selectableInput,
            inputRef: function inputRef(r) {
              return _this2.input = r;
            },
            onChange: this.onChange,
            onSelectionChange: this.onSelectionChange,
            value: expr,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
            onKeyDown: this.onKeyDown,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            superscript: superscript,
            theme: {
              root: classes.root,
              input: (0, _classnames2.default)(classes.input, error && classes.inputError)
            }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: classes.padHolder },
          _react2.default.createElement(_basic2.default, {
            className: (0, _classnames2.default)(classes.basic, mode === 'basic' && classes.onlyBasic),
            onInput: this.onInput
          }),
          mode === 'scientific' && _react2.default.createElement(_scientific2.default, { onInput: this.onInput })
        )
      );
    }
  }]);

  return Calculator;
}(_react2.default.Component);

Calculator.propTypes = {
  angleMode: _propTypes2.default.oneOf(['deg', 'rad']).isRequired,
  onAngleModeChange: _propTypes2.default.func.isRequired,
  expr: _propTypes2.default.string.isRequired,
  onEvaluate: _propTypes2.default.func.isRequired,
  error: _propTypes2.default.object,
  onClearError: _propTypes2.default.func,
  classes: _propTypes2.default.object.isRequired,
  mode: _propTypes2.default.oneOf(['basic', 'scientific'])
};
exports.default = (0, _styles.withStyles)(function () {
  return {
    calculator: {
      backgroundColor: '#070d17',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'inherit',
      padding: '4px'
    },
    selectableInput: {
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      fontSize: 'inherit'
    },
    root: {
      width: 'inherit',
      maxWidth: '100%',
      height: '100%',
      fontSize: 'inherit'
    },
    input: {
      width: '100%',
      height: '100%',
      color: 'white',
      fontSize: '2.5rem',
      textAlign: 'right'
    },
    inputError: {
      color: colors.error
    },
    padHolder: {
      display: 'flex',
      color: 'inherit',
      fontSize: 'inherit',
      flexGrow: 1
    },
    basic: {
      color: 'inherit',
      fontSize: 'inherit',
      flexGrow: 1,
      width: '100%',
      height: '100%'
    }
  };
})(Calculator);