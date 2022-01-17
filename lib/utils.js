'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertAt = undefined;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('@pie-framework:material-ui-calculator:utils');

var insertAt = exports.insertAt = function insertAt(src, position, value) {

  var p = typeof position === 'number' ? { start: position, end: position } : position;
  log(position, p);
  var start = p.start,
      end = p.end;

  log('start: ', start, ' end: ', end);
  if (isNaN(start) || isNaN(end)) {
    throw new Error('start and end must be defined derived: ' + JSON.stringify(p) + ' from ' + JSON.stringify(position));
  }

  return [src.slice(0, start), value, src.slice(end)].join('');
};