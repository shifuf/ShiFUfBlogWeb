// src/utils/request.js
import axios from 'axios';
import { message } from 'ant-design-vue';

const service = axios.create({
    baseURL: '/api', // 接口基础路径（根据实际情况调整）
    timeout: 100000, // 请求超时时间
    withCredentials: true, // 允许携带cookie
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;

        if (res.code !== 200) { // 假设后端返回的正确状态码为200
            message.error(res.msg || 'Error');
            return Promise.reject(new Error(res.msg || 'Error'));
        }

        return res;
    },
    error => {
        let errorMsg = '网络异常，请检查您的网络连接';

        if (error.response && error.response.data) {
            errorMsg = error.response.data.message || errorMsg;
        }

        message.error(errorMsg);
        return Promise.reject(error);
    }
);

export default service;