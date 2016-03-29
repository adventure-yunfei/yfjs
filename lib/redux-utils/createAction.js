// 构造FSA (Flux Standard Action)
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = createAction;

function createAction(type, payload, error, meta) {
    return { type: type, payload: payload, error: error, meta: meta };
}

module.exports = exports["default"];