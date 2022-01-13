import axios from 'axios'
import store from '../store'
import router from '../router/index.js'

const instance = axios.create({
    baseURL: 'http://localhost:8989/gwhx/',
    timeout:5000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    // if (config.url == 'users/login') {
    //     return config;
    // }
    // if(localStorage.getItem("user") == null){
    //     router.push('/login').then(r => {
    //         ElMessage.error('登陆失效');
    //     });
    // }else {
    //     config.headers["token"] = JSON.parse(localStorage.getItem("user")).user.userId;
    // }
    return config;
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
    // router.push('/login').then(r => {
    //
    // });
    return Promise.reject(error);
});

export default instance;