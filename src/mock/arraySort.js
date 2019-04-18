import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

Mock.mock(beseUrl + '/arraySort', 'get', () => {
  let result = [];
  for (let i = 0; i < 10; i++) {
    result.push(Random.integer(1, 999));
  }
  return {
    'resultCode': '000000',
    'resultData': result,
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
