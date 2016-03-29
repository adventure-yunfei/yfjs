'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.configHandler = configHandler;
exports['default'] = request;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

// 配置默认的请求处理函数, 以在返回值中直接返回 response.data
var successHandler = function successHandler(response) {
    return response.data;
};
var failureHandler = function failureHandler(response) {
    return Promise.reject(response.data);
};

function configHandler(_ref) {
    var _ref$success = _ref.success;
    var success = _ref$success === undefined ? successHandler : _ref$success;
    var _ref$failure = _ref.failure;
    var failure = _ref$failure === undefined ? failureHandler : _ref$failure;

    successHandler = success;
    failureHandler = failure;
}

function request() {
    return _axios2['default'].apply(undefined, arguments).then(successHandler, failureHandler);
}

var get = function get(url) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return request(_extends({ url: url }, config));
};
exports.get = get;
var post = function post(url) {
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    return request(_extends({
        url: url,
        data: data,
        method: 'post'
    }, config));
};
exports.post = post;