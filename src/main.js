// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import FastClick from 'fastclick';
import http from '@/plugins/http';
import '@/plugins/longTouch';

Vue.config.productionTip = false;

Vue.use(http.install);

if ('addEventListener' in document) {
  // fastclick设置
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
  // 响应字体设置
  let html = document.documentElement;
  let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let reSize = function () {
    let clientWidth = html.clientWidth;
    if (!clientWidth) {
      return;
    }
    html.style.fontSize = 20 * (clientWidth / 375) + 'px';
  };
  window.addEventListener(resizeEvent, reSize, false);
  document.addEventListener('DOMContentLoaded', reSize, false);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
