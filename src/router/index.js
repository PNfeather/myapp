import Vue from 'vue';
import Router from 'vue-router';
import routeConfig from './routeConfig';
import IndexPage from '@/pages/index/index.vue';
// import _ from '@/plugins/lodash';

Vue.use(Router);

const routes = routeConfig;

// 首页、错误页不做懒加载
routes.push({path: '/', name: 'index', component: IndexPage});
// 错误页设置方法
routes.push({path: '*', redirect: '/unfind'});

let router = new Router({
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.pageMark) {
    console.log('页面有个标记:' + to.meta.pageMark);
  }
  next();
});

export default router;
