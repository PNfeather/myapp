const config = [
{path: '/inputUserName', name: 'inputUserName', meta: {}, component: () => import(/* webpackChunkName: "inputUserName")} */ '@/pages/inputUserName/inputUserName.vue')},
{path: '/directTestPage', name: 'directTestPage', meta: {'pageMark': '标记1'}, component: () => import(/* webpackChunkName: "directTestPage")} */ '@/pages/directTestPage/directTestPage.vue')},
{path: '/tabsTestPage', name: 'tabsTestPage', meta: {'pageMark': '标记2'}, component: () => import(/* webpackChunkName: "tabsTestPage")} */ '@/pages/tabsTestPage/tabsTestPage.vue')},
{path: '/clickTabsTestPages', name: 'clickTabsTestPages', meta: {}, component: () => import(/* webpackChunkName: "clickTabsTestPages")} */ '@/pages/clickTabsTestPages/clickTabsTestPages.vue')},
{path: '/BscrollTabsTestPage', name: 'BscrollTabsTestPage', meta: {}, component: () => import(/* webpackChunkName: "BscrollTabsTestPage")} */ '@/pages/BscrollTabsTestPage/BscrollTabsTestPage.vue')},
{path: '/designMode', name: 'designMode', meta: {}, component: () => import(/* webpackChunkName: "designMode")} */ '@/pages/designMode/designMode.vue')},
{path: '/testDom', name: 'testDom', meta: {}, component: () => import(/* webpackChunkName: "testDom")} */ '@/pages/testDom/testDom.vue')},
{path: '/unfind', name: 'unfind', meta: {}, component: () => import(/* webpackChunkName: "unfind")} */ '@/pages/unfind/unfind.vue')}];
export default config;
