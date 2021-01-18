import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';
import routeConfig from './routeConfig';
import IndexPage from '@/pages/index/index.vue';
import storage from '@/tools/localStorage';

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
  const routerHistory = store.state.routerHistory;
  const isFirstRouter = store.state.isFirstRouter;
  const routerHistoryLen = routerHistory.length;
  if (!routerHistoryLen && !isFirstRouter) store.dispatch('doChangeIsFirstRouter', true);
  if (routerHistoryLen && isFirstRouter) store.dispatch('doChangeIsFirstRouter', false);
  if (routerHistoryLen && routerHistory[routerHistoryLen - 1] === to.name) {
    next();
    return;
  }
  if (routerHistoryLen >= 2 && routerHistory[routerHistoryLen - 2] === to.name) {
    store.dispatch('doPopRouterHistory');
  } else if (routerHistoryLen >= 50) {
    store.dispatch('doShiftRouterHistory');
    store.dispatch('doPushRouterHistory', to.name);
  } else {
    store.dispatch('doPushRouterHistory', to.name);
  }
  if (to.meta.needLogin) {
    let userName = storage.get('userName');
    if (!userName) {
      router.push('inputUserName');
    }
  }
  next();
});

// 对router.go进行处理,对不同情况做不同的历史路由数据处理
const goOptimize = (go) => {
  return (...args) => {
    const routerHistory = store.state.routerHistory;
    const routerHistoryLen = routerHistory.length;
    const param = args[0];
    if (param && (typeof param === 'string')) {
      let currentRouterIndex = routerHistory.lastIndexOf(param);
      if (currentRouterIndex > -1) {
        store.dispatch('doSliceRouterHistory', currentRouterIndex + 1);
        args[0] = -(routerHistoryLen - currentRouterIndex - 1);
      } else {
        console.warn('历史路径找不到' + param);
        return false;
      }
    } else if (param && (typeof param === 'number') && param < -1) {
      store.dispatch('doSliceRouterHistory', routerHistoryLen + param);
    }
    return go.apply(router, args);
  };
};

Object.getPrototypeOf(router).go = goOptimize(Object.getPrototypeOf(router).go);

export default router;
