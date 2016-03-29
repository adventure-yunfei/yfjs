// action.type 为函数时, 保证 .toString 方法被覆盖
export default store => next => action => {
    if (action.type && action.type.toString === Function.prototype.toString) {
        throw new Error('action type of function should be overwritten "toString" method by "setToString"');
    }
    return next(action);
};
