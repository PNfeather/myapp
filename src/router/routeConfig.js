const config = [
{path: '/directTestPage', name: 'directTestPage', meta: {}, component: () => import(/* webpackChunkName: "directTestPage")} */ '@/pages/directTestPage/directTestPage.vue')},
{path: '/test1', name: 'test1', meta: {}, component: () => import(/* webpackChunkName: "test1")} */ '@/pages/test1/test1.vue')},
{path: '/test2', name: 'test2', meta: {'pageMark': 'page2'}, component: () => import(/* webpackChunkName: "test2")} */ '@/pages/test2/test2.vue')},
{path: '/test3', name: 'test3', meta: {'pageMark': 'page3'}, component: () => import(/* webpackChunkName: "test3")} */ '@/pages/test3/test3.vue')},
{path: '/unfind', name: 'unfind', meta: {}, component: () => import(/* webpackChunkName: "unfind")} */ '@/pages/unfind/unfind.vue')}];
export default config;
