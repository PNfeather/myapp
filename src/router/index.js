import Vue from 'vue';
import Router from 'vue-router';
import routeConfig from './routeConfig';

Vue.use(Router);

const routes = routeConfig;

let router = new Router({
  routes: routes
});

export default router;
