'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInput = undefined;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _utils = require('./utils');

var _selector = require('./selector');

var _isRegExp = require('lodash/isRegExp');

var _isRegExp2 = _interopRequireDefault(_isRegExp);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('@pie-framework:material-ui-calculator:math-input');
var map = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹'
};

var fn = function fn(n) {
  return {
    match: n,
    emit: n + '(|)'
  };
};

var INPUTS = [{
  match: /^[\+\-\(\)]$/, //eslint-disable-line
  passthrough: true
}, {
  match: /^e$/,
  passthrough: true
}, {
  match: /\./,
  passthrough: true
}, {
  match: '1/x',
  emit: '1/[x]'
}, {
  match: /[0-9]/,
  passthrough: true
}, {
  match: 'π',
  emit: 'π'
}, {
  match: '*',
  emit: '×'
}, {
  match: ['sqrt', '√'],
  emit: '√(|)'
}, {
  match: '^',
  emit: '[ʸ]',
  superscript: /[0-9]/
}, {
  match: 'square',
  emit: map[2]
}, {
  match: 'cube',
  emit: map[3]
}, fn('sin'), fn('cos'), fn('tan'), fn('asin'), fn('acos'), fn('atan'), fn('log'), fn('ln'), fn('abs'), {
  match: '%',
  emit: '%'
}, {
  match: '!',
  emit: '!'
}, {
  match: 'ʸ√x',
  emit: '[ʸ]√',
  superscript: /[0-9]/
}, {
  match: '/',
  emit: '÷'
}, {
  match: 'clear',
  emit: function emit() {
    return {
      expr: '',
      position: {
        start: 0,
        end: 0
      }
    };
  }
}, {
  match: 'backspace',
  emit: function emit(expr, position) {
    var start = position.start,
        end = position.end;

    if (start <= 0 || end <= 0) {
      return {
        expr: expr,
        position: {
          start: start,
          end: end
        }
      };
    }

    var update = expr.slice(0, start - 1) + expr.slice(end);
    return {
      expr: update,
      position: {
        start: start - 1,
        end: end - 1
      }
    };
  }
}, {
  match: 'plus-minus',
  emit: function emit(expr, position) {
    var update = expr.indexOf('-') === 0 ? expr.substring(1) : '-' + expr;
    var added = update.length > expr.length;
    return {
      expr: update,
      position: {
        start: position.start + (added ? 1 : -1),
        end: position.end + (added ? 1 : -1)
      }
    };
  }
}];

var getSuperscript = function getSuperscript(char) {
  return map[char];
};

var buildUpdate = function buildUpdate(value, start, end, emit) {
  var result = (0, _selector.select)(emit);

  log('[buildUpdate] result: ', result);
  var valueUpdate = (0, _utils.insertAt)(value, { start: start, end: end }, result.value);
  log('[buildUpdate] emitValue: ', valueUpdate);
  return {
    update: valueUpdate,
    start: start + result.start,
    end: start + result.end
  };
};

var isMatch = function isMatch(match, input) {
  var m = Array.isArray(match) ? match : [match];

  var matches = function matches(m) {
    if (m instanceof RegExp) {
      log('test input: ', input, ' with regex:', m.toString());
      return m.test(input);
    } else {
      return m === input;
    }
  };
  return m.some(matches);
};

var handleInput = exports.handleInput = function handleInput(input, value, selectionStart, selectionEnd, superscript) {
  (0, _invariant2.default)(superscript ? (0, _isRegExp2.default)(superscript) : true, 'superscript must be RegExp if defined but got: ' + superscript);

  if (superscript && superscript.test(input)) {
    var sv = getSuperscript(input);
    log('[handleInput] sv: ', sv);
    if (sv) {
      var _buildUpdate = buildUpdate(value, selectionStart, selectionEnd, sv),
          update = _buildUpdate.update,
          start = _buildUpdate.start,
          end = _buildUpdate.end;

      log('[handleInput] superscript: update: ', update, start, end);
      return {
        value: update,
        selectionStart: update.length,
        selectionEnd: update.length,
        superscript: superscript
      };
    }
  }

  var handler = INPUTS.find(function (v) {
    return isMatch(v.match, input);
  });

  if (handler) {
    log('[handleInput] handler: ', handler);

    if (handler.passthrough) {
      return {
        passthrough: true
      };
    } else {
      if ((0, _isFunction2.default)(handler.emit)) {
        var o = handler.emit(value, {
          start: selectionStart,
          end: selectionEnd
        });
        return {
          value: o.expr,
          selectionStart: o.position.start,
          selectionEnd: o.position.end,
          superscript: o.superscript || superscript
        };
      } else {
        var _buildUpdate2 = buildUpdate(value, selectionStart, selectionEnd, handler.emit),
            _update = _buildUpdate2.update,
            _start = _buildUpdate2.start,
            _end = _buildUpdate2.end;

        return {
          value: _update,
          selectionStart: _start,
          selectionEnd: _end,
          superscript: handler.superscript
        };
      }
    }
  }
};