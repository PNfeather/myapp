// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import FastClick from 'fastclick';
import http from '@/plugins/http';
import store from '@/store';
import '@/plugins/longTouch';
import '@/plugins/clickOutside';
import '@/plugins/findScroll';
import '@/plugins/dragElement';
import Page from '@/components/page/page';
import header from '@/components/header/header';
import Main from '@/components/main/main';
import {
  Header, Button, Popup, Swipe, SwipeItem, Tabbar, TabItem, MessageBox, Toast, InfiniteScroll, Spinner, Loadmore, Picker, Indicator, DatetimePicker, TabContainer, TabContainerItem, CellSwipe, Switch, Lazyload
} from 'mint-ui';
process.env.MOCK && require('@/mock');

// mint-ui组件引入
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Switch.name, Switch);

Vue.use(InfiniteScroll);
Vue.use(Lazyload, { // 配置懒加载默认图片
  loading: require('./assets/image/defaultImage.png'),
  attempt: 3
});

Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;
Vue.$swipe = Vue.prototype.$swipe = Swipe;

Vue.config.productionTip = false;

Vue.use(http.install);

Vue.component(Page.name, Page);
Vue.component(header.name, header);
Vue.component(Main.name, Main);

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

Vue.prototype.$EVENTBUS = new Vue(); // 定义一个事件总线

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => {
    return h(App);
  }
});
