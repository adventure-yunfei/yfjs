"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createReducer = createReducer;

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