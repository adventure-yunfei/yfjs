'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = pendingActionsReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function pendingActionsReducer(state, _ref) {
    if (state === undefined) state = _immutable2['default'].fromJS({});
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