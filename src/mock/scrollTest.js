import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let data = []; // 用于接受生成数据的数组
let dataNum = Random.integer(8, 30);
for (let i = 0; i < dataNum; i++) { // 可自定义生成的个数
  let id = Random.id();
  let template = {
    'name': Random.cname(),
    'id': id.substring(0, 4) + '******' + id.substr(14),
    'email': Random.email()
  };
  data.push(template);
}

Mock.mock(beseUrl + '/scrollTest', 'get', (options) => {
  let params = JSON.parse(options.body);
  let pageSize = params.pageSize;
  let pageNum = params.pageNum;
  let start = (pageNum - 1) * pageSize;
  let end = start + pageSize;
  let result = [];
  (start < 0) && (start = 0);
  (end > data.length - 1) && (end = data.length);
  for (let i = start; i < end; i++) {
    result.push(data[i]);
  }
  return {
    'resultCode': '000000',
    'resultData': result,
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据
