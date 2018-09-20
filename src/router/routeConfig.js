const config = [
{path: '/', name: 'index', component: () => import(/* webpackChunkName: "index")} */ '@/pages/index/index.vue')},
{path: '/test1', name: 'test1', component: () => import(/* webpackChunkName: "test1")} */ '@/pages/test1/test1.vue')}];
export default config;
