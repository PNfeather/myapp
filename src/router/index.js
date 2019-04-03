import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import routeConfig from './routeConfig';
import IndexPage from '@/pages/index/index.vue';
import storageStore from '@/tools/localStorage';

Vue.use(Router);

const routes = routeConfig;

// 首页、错误页不做懒加载
routes.push({path: '/', name: 'index', component: IndexPage, meta: {'needLogin': true}});
// 错误页设置方法
routes.push({path: '*', redirect: '/unfind'});

let router = new Router({
  routes: routes
});

router.beforeEach((to, from, next) => {
  // 根据路由进入页面对历史路由存储进行不同处理
  let routerHistory = store.state.routerHistory;
  let isFirstRouter = store.state.isFirstRouter;
  let routerHistoryLen = routerHistory.length;
  if (!routerHistoryLen && !isFirstRouter) store.dispatch('doChangeIsFirstRouter', true);
  if (routerHistoryLen && isFirstRouter) store.dispatch('doChangeIsFirstRouter', false);
  if (routerHistoryLen >= 2 && routerHistory[routerHistoryLen - 2] === to.name) {
    store.dispatch('doPopRouterHistory');
  } else if (routerHistoryLen >= 40) {
    store.dispatch('doShiftRouterHistory');
    store.dispatch('doPushRouterHistory', to.name);
  } else {
    store.dispatch('doPushRouterHistory', to.name);
  }
  if (to.meta.needLogin) {
    let userName = storageStore.get.userName();
    if (!userName) {
      router.push('inputUserName');
    }
  }
  next();
});

router.afterEach((to, from) => {
  if (store.state.pagePopupQueueArray.length) store.commit('clearPagePopupQueueArray');
});

let goPtimize = function (oldFn) { // 对router.go进行处理,对不同情况做不同的历史路由数据处理
  return function () {
    let routerHistory = store.state.routerHistory;
    let routerHistoryLen = routerHistory.length;
    let param = arguments[0];
    if (param && (typeof param === 'string')) {
      let currentRouterIndex = routerHistory.lastIndexOf(param);
      if (currentRouterIndex > -1) {
        store.dispatch('doSliceRouterHistory', currentRouterIndex);
        arguments[0] = -(routerHistoryLen - currentRouterIndex - 1);
      } else {
        console.log('历史路径找不到' + param);
      }
    } else if (param && (typeof param === 'number') && param < -1) {
      store.dispatch('doSliceRouterHistory', routerHistoryLen + param - 1);
    }
    return oldFn.apply(this, arguments);
  };
};

Object.getPrototypeOf(router).go = goPtimize(Object.getPrototypeOf(router).go);

export default router;
