// 针对immutable store的combineReducers方法
// @param reducersMap {<key>: <reducer>}
export default function combineImmutableReducers(subReducersMap, ownReducer = null) {
    const keys = Object.keys(subReducersMap);
    return (state, action) => {
        keys.forEach(key => {
            state = state.set(key, subReducersMap[key](state.get(key), action));
        });
        return ownReducer ? ownReducer(state, action) : state;
    };
}
