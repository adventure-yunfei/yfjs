import axios from 'axios';

// 配置默认的请求处理函数, 以在返回值中直接返回 response.data
let successHandler = response => response.data;
let failureHandler = response => Promise.reject(response.data);

export function configHandler({success = successHandler, failure = failureHandler}) {
    successHandler = success;
    failureHandler = failure;
}

export default function request(...args) {
    return axios(...args).then(successHandler, failureHandler);
}

export const get = (url, config = {}) => request({url, ...config});
export const post = (url, data = {}, config = {}) => request({
    url,
    data,
    method: 'post',
    ...config
});
