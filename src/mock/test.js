
const Mock = require('mockjs');

Mock.mock('/test', 'get', {
  'resultCode': '000000',
  'resultData': {
    'text': '这是一个mock测试数据'
  },
  'resultMsg': 'success'
});
