'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secondary = exports.primary = exports.disabled = exports.error = undefined;

var _pink = require('@material-ui/core/colors/pink');

var _pink2 = _interopRequireDefault(_pink);

var _indigo = require('@material-ui/core/colors/indigo');

var _indigo2 = _interopRequireDefault(_indigo);

var _grey = require('@material-ui/core/colors/grey');

var _grey2 = _interopRequireDefault(_grey);

var _red = require('@material-ui/core/colors/red');

var _red2 = _interopRequireDefault(_red);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v = function v(name, fallback) {
  return 'var(--material-ui-calc-' + name + ', ' + fallback + ')';
};

var disabled = v('disabled', _grey2.default[500]);
var error = v('error', _red2.default[500]);

var primary = {
  light: v('primary-light', _indigo2.default[50]),
  main: v('primary-main', _indigo2.default[300]),
  dark: v('primary-dark', _indigo2.default[900])
};

var secondary = {
  light: v('secondary-light', _pink2.default[100]),
  main: v('secondary-main', _pink2.default[300]),
  dark: v('secondary-dark', _pink2.default[900])
};

exports.error = error;
exports.disabled = disabled;
exports.primary = primary;
exports.secondary = secondary;