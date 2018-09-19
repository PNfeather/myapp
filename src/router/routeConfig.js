const config = [
{path: '/', name: 'HelloWorld', component: () => import(/* webpackChunkName: "HelloWorld")} */ '@/pages/HelloWorld/HelloWorld.vue')},
{path: '/test1', name: 'test1', component: () => import(/* webpackChunkName: "test1")} */ '@/pages/test1/test1.vue')}];
export default config;
