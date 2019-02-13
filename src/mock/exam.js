import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let data = []; // 用于接受生成数据的数组

for (let i = 0; i < 10; i++) { // 可自定义生成的个数
  let template = {
    'index': i + 1,
    'question': '这是问题' + (i + 1),
    'answer-a': Random.cword(2, 5),
    'answer-b': Random.cword(2, 5),
    'answer-c': Random.cword(2, 5),
    'answer-d': Random.cword(2, 5)
  };
  data.push(template);
}

Mock.mock(beseUrl + '/exam', 'get', {
  'resultCode': '000000',
  'resultData': data,
  'resultMsg': 'success'
}); // 根据数据模板生成模拟数据
