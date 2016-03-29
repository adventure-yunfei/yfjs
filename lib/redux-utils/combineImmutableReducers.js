// 针对immutable store的combineReducers方法
// @param reducersMap {<key>: <reducer>}
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = combineImmutableReducers;

function combineImmutableReducers(subReducersMap) {
    var ownReducer = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var keys = Object.keys(subReducersMap);
    return function (state, action) {
        keys.forEach(function (key) {
            state = state.set(key, subReducersMap[key](state.get(key), action));
        });
        return ownReducer ? ownReducer(state, action) : state;
    };
}

module.exports = exports["default"];