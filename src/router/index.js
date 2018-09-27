import Vue from 'vue';
import Router from 'vue-router';
import routeConfig from './routeConfig';
import IndexPage from '@/pages/index/index.vue';
import _ from '@/plugins/lodash';

Vue.use(Router);

const routes = routeConfig;

// 首页不做懒加载
routes.push({path: '/', name: 'index', component: IndexPage});

let router = new Router({
  routes: routes
});

router.beforeEach((to, from, next) => {
  let toPage = _.find(routeConfig, ['path', to.path]);
  if (!toPage && to.path !== '/') {
    next('unfind');
    return false;
  }
  if (to.meta.pageMark) {
    console.log('页面有个标记:' + to.meta.pageMark);
  }
  next();
});

export default router;
