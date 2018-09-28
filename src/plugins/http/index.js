import axios from 'axios';

console.log(axios);

export default {
  install (Vue) {
    Vue.prototype.$http = axios;
    Vue.http = axios;
  }
};
