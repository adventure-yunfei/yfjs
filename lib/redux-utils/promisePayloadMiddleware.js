'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isPromise = function isPromise(val) {
    return val && typeof val.then === 'function';
};
/* 允许 payload 为 promise 的action,
 同时在这些 action 开始和结束的时候发布 "@ACTION_START" 和 "@ACTION_END" action
 dispatch返回值与之前类似, 返回promise, resolve状态为对应的action (payload为数据而非promise)
 例:
    dispatch({type: 'blabla...', payload: Promise.resolve(100)
        .then(action) {
            action.type === 'blabla...';
            action.payload === 100;
        };
*/

exports['default'] = function (store) {
    return function (next) {
        return function (action) {
            var pendingAction = function pendingAction(type) {
                return { type: type, payload: action.type };
            };
            if (isPromise(action.payload)) {
                next(pendingAction('@ACTION_START'));
                return action.payload.then(function (payload) {
                    return next(_extends({}, action, {
                        payload: payload
                    }));
                }).then(function (value) {
                    next(pendingAction('@ACTION_END'));
                    return value;
                }, function (reason) {
                    next(pendingAction('@ACTION_END'));
                    return Promise.reject(reason);
                });
            } else {
                return next(action);
            }
        };
    };
};

module.exports = exports['default'];