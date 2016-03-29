import immutable from 'immutable';

export default function pendingActionsReducer(state = immutable.fromJS({}), {type, payload}) {
    switch (type) {
        case '@ACTION_START':
            return state.set(payload.toString(), true);
        case '@ACTION_END':
            return state.delete(payload.toString());
        default:
            return state;
    }
}
