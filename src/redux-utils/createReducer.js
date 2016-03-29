export function createReducer(handlerMap, {defaultState = null} = {}) {
    return (state = defaultState, action) => {
        const handler = handlerMap.get(action.type);
        return handler ? handler(state, action.payload, action) : state;
    };
}
