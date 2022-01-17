'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var select = exports.select = function select(value) {

  var pipeIndex = value.indexOf('|');

  if (pipeIndex !== -1) {
    var _cleaned = value.substring(0, pipeIndex) + value.substring(pipeIndex + 1);
    return {
      value: _cleaned,
      start: pipeIndex,
      end: pipeIndex
    };
  }

  var leftBracketIndex = value.indexOf('[');
  var rightBracketIndex = value.indexOf(']');

  if (leftBracketIndex === -1 && rightBracketIndex === -1) {
    return { value: value, start: value.length, end: value.length };
  }

  if (leftBracketIndex === -1 && rightBracketIndex !== -1 || leftBracketIndex !== -1 && rightBracketIndex === -1) {
    throw new Error('missing open or closing bracket');
  }

  if (leftBracketIndex > rightBracketIndex) {
    throw new Error('left bracket must be before right bracket');
  }

  var cleaned = value.substring(0, leftBracketIndex) + value.substring(leftBracketIndex + 1, rightBracketIndex) + value.substring(rightBracketIndex + 1);

  return {
    value: cleaned,
    start: leftBracketIndex,
    end: rightBracketIndex - 1
  };
};