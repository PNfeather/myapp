const config = [
  // 指令测试页
  {path: '/directTestPage', name: 'directTestPage', filePath: '/directTestPage', meta: {pageMark: '标记1'}},
  // tabs测试页
  {path: '/tabsTestPage', name: 'tabsTestPage', filePath: '/tabsTestPage', meta: {pageMark: '标记2'}},
  // tabs点击切换测试页面
  {path: '/clickTabsTestPages', name: 'clickTabsTestPages', filePath: '/clickTabsTestPages'},
  // 集成Bscroll的tabs组件测试页
  {path: '/BscrollTabsTestPage', name: 'BscrollTabsTestPage', filePath: '/BscrollTabsTestPage'},
  // 设计模式
  {path: '/designMode', name: 'designMode', filePath: '/designMode'},
  // dom测试页
  {path: '/testDom', name: 'testDom', filePath: '/testDom'},
  // 丢失页
  {path: '/unfind', name: 'unfind', filePath: '/unfind'}
];

module.exports = config;
