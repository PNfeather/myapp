const config = [
  // 指令测试页
  {path: '/directTestPage', name: 'directTestPage', filePath: '/directTestPage'},
  {path: '/test1', name: 'test1', filePath: '/test1'},
  {path: '/test2', name: 'test2', filePath: '/test2', meta: {pageMark: 'page2'}},
  {path: '/test3', name: 'test3', filePath: '/test3', meta: {pageMark: 'page3'}},
  // 丢失页
  {path: '/unfind', name: 'unfind', filePath: '/unfind'}
];

module.exports = config;
