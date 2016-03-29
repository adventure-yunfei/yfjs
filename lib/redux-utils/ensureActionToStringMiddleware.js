// action.type 为函数时, 保证 .toString 方法被覆盖
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (store) {
    return function (next) {
        return function (action) {
            if (action.type && action.type.toString === Function.prototype.toString) {
                throw new Error('action type of function should be overwritten "toString" method by "setToString"');
            }
            return next(action);
        };
    };
};

module.exports = exports['default'];