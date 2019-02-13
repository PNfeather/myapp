
const Mock = require('mockjs');

let beseUrl = window.location.origin + '/apis';

Mock.mock(beseUrl + '/test', 'get', {
  'resultCode': '000000',
  'resultData': {
    'text': '这是一个mock测试数据'
  },
  'resultMsg': 'success'
});
