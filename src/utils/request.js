import axios from 'axios'
import store from '../store'
import router from '../router/index.js'
import { Message } from 'element-ui';

const instance = axios.create({
    baseURL: 'http://localhost:8989/gwhx/',
    timeout:5000,
});

function parseToken(token) {
    let strings = token.split(".");
    return JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))))
}
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    let token = localStorage.getItem('token');
    if (config.url.startsWith("users")) return config;
    if (token === null || token === undefined) {
        Message.error('请登陆');
    }else {
        if (token != null) {
            config.headers["token"] = token;
            return config;
        }
    }

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.config.responseType == 'blob'){
        return response.data;
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    Message.error('登陆失效,请重新登陆')
    localStorage.removeItem('token');
    router.push('/').then(r => {
    });
    location.reload();
    return Promise.reject(error);
});

export default instance;