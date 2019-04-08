
const Mock = require('mockjs');

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random;

Mock.mock(beseUrl + '/getQrContent', 'get', (options) => {
  let params = JSON.parse(options.body);
  let type = params.type;
  return {
    'resultCode': '000000',
    // 'resultCode': '999999',
    'resultData': {
      'text': Random.cname(type)
    },
    'resultMsg': 'success'
  };
});
