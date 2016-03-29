'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = setActionToString;
var stringSet = new Set();

// 设置函数action的toString方法

function setActionToString(prefix, map) {
    forEach(map, function (val, key) {
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