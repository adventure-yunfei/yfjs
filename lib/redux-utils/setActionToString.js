'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = setActionToString;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashForEach = require('lodash/forEach');

var _lodashForEach2 = _interopRequireDefault(_lodashForEach);

var stringSet = new Set();

// 设置函数action的toString方法

function setActionToString(prefix, map) {
    (0, _lodashForEach2['default'])(map, function (val, key) {
        var str = prefix + '/' + key;
        if (stringSet.has(str)) {
            throw new Error('action string (' + str + ') already used!');
        }
        stringSet.add(str);
        val.toString = function () {
            return str;
        };
    });
}

module.exports = exports['default'];