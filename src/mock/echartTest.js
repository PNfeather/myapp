import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

Mock.mock(beseUrl + '/echartTest', 'get', (options) => {
  let params = JSON.parse(options.body);
  let time = params.time;
  let temArr = time.split('-');
  let days = new Date(temArr[0], temArr[1], 0).getDate();
  let result = []; // 用于接受生成数据的数组
  for (let i = 1; i <= days; i++) { // 可自定义生成的个数
    let template = {
      'day': i,
      'val': Random.integer(7, 30)
    };
    result.push(template);
  }
  return {
    'resultCode': '000000',
    'resultData': result,
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
