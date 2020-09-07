import axios from 'axios';
import Vue from 'vue';
import router from './router';
const http = axios.create({
  // baseURL: 'http://localhost:3000/admin/api'
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
});

// 发起请求拦截器
http.interceptors.request.use(config => {
  // 请求头里添加 Authorization： Bearer （空格） localStorage.token
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
  }
  return config;
});

// 接收响应拦截器
http.interceptors.response.use(res => {
  return res;
}, err => {
  console.log(err);
  if (err.response.data.message) {
    Vue.prototype.$message.error(err.response.data.message);
    if (err.response.status === 401) { // 报401跳转登录
      router.push('/login');
    }
  }
  
  return Promise.reject(err);
});

export default http;