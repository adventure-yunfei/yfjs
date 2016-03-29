'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodashForEach = require('lodash/forEach');

var _lodashForEach2 = _interopRequireDefault(_lodashForEach);

var isPromise = function isPromise(val) {
    return val && typeof val.then === 'function';
};
// 允许 payload 为 promise 的action,
// 同时在这些 action 开始和结束的时候发布 "@ACTION_START" 和 "@ACTION_END" action
var promisePayloadMiddleware = function promisePayloadMiddleware(store) {
    return function (next) {
        return function (action) {
            var pendingAction = function pendingAction(type) {
                return { type: type, payload: action.type };
            };
            if (isPromise(action.payload)) {
                next(pendingAction('@ACTION_START'));
                return action.payload.then(function (payload) {
                    var result = next(_extends({}, action, {
                        payload: payload
                    }));
                    next(pendingAction('@ACTION_END'));
                    return result;
                }).then(function (value) {
                    // TODO: .finally from fbjs/promise doesn't work!
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

// action.type 为函数时, 保证 .toString 方法被覆盖, 且返回字符串唯一
var ensureActionToStringMiddleware = function ensureActionToStringMiddleware(store) {
    return function (next) {
        return function (action) {
            if (action.type && action.type.toString === Function.prototype.toString) {
                throw new Error('action type of function should be overwritten "toString" method by "setToString"');
            }
            return next(action);
        };
    };
};

var stringSet = new Set();
function setToString(prefix, map) {
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

// 针对immutable store的combineReducers方法
// @param reducersMap {<key>: <reducer>}
function combineReducers(subReducersMap) {
    var ownReducer = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var keys = Object.keys(subReducersMap);
    return function (state, action) {
        keys.forEach(function (key) {
            state = state.set(key, subReducersMap[key](state.get(key), action));
        });
        return ownReducer ? ownReducer(state, action) : state;
    };
}

function createAction(type, payload, error, meta) {
    return { type: type, payload: payload, error: error, meta: meta };
}

function createReducer(handlerMap) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$defaultState = _ref.defaultState;
    var defaultState = _ref$defaultState === undefined ? null : _ref$defaultState;

    return function (state, action) {
        if (state === undefined) state = defaultState;

        var handler = handlerMap.get(action.type);
        return handler ? handler(state, action.payload, action) : state;
    };
}

function pendingActionsReducer(state, _ref2) {
    if (state === undefined) state = _immutable2['default'].fromJS({});
    var type = _ref2.type;
    var payload = _ref2.payload;

    switch (type) {
        case '@ACTION_START':
            return state.set(payload.toString(), true);
        case '@ACTION_END':
            return state['delete'](payload.toString());
        default:
            return state;
    }
}

exports.promisePayloadMiddleware = promisePayloadMiddleware;
exports.ensureActionToStringMiddleware = ensureActionToStringMiddleware;
exports.combineReducers = combineReducers;
exports.setToString = setToString;
exports.createAction = createAction;
exports.createReducer = createReducer;
exports.pendingActionsReducer = pendingActionsReducer;