import axios from 'axios';
// 设置用户类型
axios.defaults.headers.common['Clinent-Identify'] = 'H5';

// 设置资源说明
axios.defaults.headers.common['RESOURCE-FLAG'] = 'vue';

// 请求参数类型
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

// 请求超时时间
axios.defaults.timeout = 30000;

// 默认返回数据格式
axios.defaults.responseType = 'json';

// 请求路径
axios.defaults.baseURL = window.location.origin + '/apis';

// 设置默认token
axios.defaults.headers['TOCKEN'] = window.localStorage.getItem('MYAPP-TOCKEN') || '';

let pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === JSON.stringify(config, ['url', 'method'])) { // 当当前请求在数组中存在时执行函数体
      pending[p].f(pending[p].u); // 执行取消操作
      pending.splice(p, 1); // 把这条记录从数组中移除
    }
  }
};

// 添加请求拦截器
axios.interceptors.request.use(config => {
  removePending(config); // 在一个ajax发送前执行一下取消操作
  config.cancelToken = new CancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: JSON.stringify(config, ['url', 'method']), f: c });
  });
  return config;
}, error => {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  removePending(response.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return response;
}, error => {
  console.warn(error);
});

export default {
  install (Vue) {
    Vue.prototype.$http = axios;
    Vue.http = axios;
  }
};
