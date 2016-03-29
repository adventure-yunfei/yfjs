const isPromise = (val) => val && typeof val.then === 'function';
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
export default store => next => action => {
    const pendingAction = (type) => ({type, payload: action.type});
    if (isPromise(action.payload)) {
        next(pendingAction('@ACTION_START'));
        return action.payload.then((payload) => {
            return next({
                ...action,
                payload
            });
        }).then(value => {
            next(pendingAction('@ACTION_END'));
            return value;
        }, reason => {
            next(pendingAction('@ACTION_END'));
            return Promise.reject(reason);
        });
    } else {
        return next(action);
    }
};
