'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var log = (0, _debug2.default)('@pie-framework:material-ui-calculator');

var SelectableInput = function (_React$Component) {
  _inherits(SelectableInput, _React$Component);

  function SelectableInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectableInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectableInput.__proto__ || Object.getPrototypeOf(SelectableInput)).call.apply(_ref, [this].concat(args))), _this), _this.applySelection = function () {
      if (_this.input) {
        var _this$props = _this.props,
            selectionEnd = _this$props.selectionEnd,
            selectionStart = _this$props.selectionStart;

        _this.input.selectionStart = selectionStart;
        _this.input.selectionEnd = selectionEnd;
        log('input: ', _this.input.selectionStart, _this.input.selectionEnd);
      }
    }, _this.onKeyUp = function () {
      log('[onKeyUp]');
      var onSelectionChange = _this.props.onSelectionChange;


      var update = _this.getUpdate();
      if (update) {
        onSelectionChange(update);
      }
    }, _this.onChange = function (event) {
      log('[onChange]');
      var onChange = _this.props.onChange;


      onChange({
        target: {
          value: event.target.value,
          selectionStart: event.target.selectionStart,
          selectionEnd: event.target.selectionEnd
        }
      });
    }, _this.getUpdate = function () {
      return _this.input && {
        selectionStart: _this.input.selectionStart,
        selectionEnd: _this.input.selectionEnd
      };
    }, _this.onClick = function () {
      var onSelectionChange = _this.props.onSelectionChange;

      var update = _this.getUpdate();
      if (update) {
        onSelectionChange(update);
      }
    }, _this.inputRef = function (r) {
      _this.input = r;
      var inputRef = _this.props.inputRef;

      if (inputRef) {
        inputRef(_this.input);
      }
    }, _this.onKeyDown = function (e) {
      var onKeyDown = _this.props.onKeyDown;

      if (onKeyDown) {
        onKeyDown(e);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectableInput, [{
    key: 'focus',
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.applySelection();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.applySelection();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          className = _props.className,
          theme = _props.theme,
          onFocus = _props.onFocus,
          onBlur = _props.onBlur;


      var inputTheme = theme ? theme : {};
      return _react2.default.createElement(_TextField2.default, {
        className: className,
        inputRef: this.inputRef,
        onKeyUp: this.onKeyUp,
        onKeyDown: this.onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur,
        value: value,
        onChange: this.onChange,
        onClick: this.onClick,
        InputProps: {
          disableUnderline: true,
          classes: inputTheme
        }
      });
    }
  }]);

  return SelectableInput;
}(_react2.default.Component);

SelectableInput.propTypes = {
  onKeyDown: _propTypes2.default.func,
  inputRef: _propTypes2.default.func,
  onSelectionChange: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string.isRequired,
  selectionEnd: _propTypes2.default.number,
  selectionStart: _propTypes2.default.number,
  className: _propTypes2.default.string,
  theme: _propTypes2.default.object,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func
};
exports.default = SelectableInput;