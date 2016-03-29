'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = pendingActionsReducer;

function pendingActionsReducer(state, _ref) {
    if (state === undefined) state = immutable.fromJS({});
    var type = _ref.type;
    var payload = _ref.payload;

    switch (type) {
        case '@ACTION_START':
            return state.set(payload.toString(), true);
        case '@ACTION_END':
            return state['delete'](payload.toString());
        default:
            return state;
    }
}

module.exports = exports['default'];