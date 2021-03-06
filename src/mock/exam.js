import Mock from 'mockjs'; // 引入mockjs

let beseUrl = window.location.origin + '/apis';

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

Mock.mock(beseUrl + '/exam', 'get', () => {
  let data = []; // 用于接受生成数据的数组

  for (let i = 0; i < 10; i++) { // 可自定义生成的个数
    let template = {
      'index': i + 1,
      'question': '这是问题' + (i + 1),
      'answers': [
        {
          'answer': 'a',
          'text': Random.cword(2, 5)
        }, {
          'answer': 'b',
          'text': Random.cword(2, 5)
        }, {
          'answer': 'c',
          'text': Random.cword(2, 5)
        }, {
          'answer': 'd',
          'text': Random.cword(2, 5)
        }
      ]
    };
    data.push(template);
  }
  return {
    'resultCode': '000000',
    'resultData': data,
    'resultMsg': 'success'
  };
}); // 根据数据模板生成模拟数据

Mock.mock(beseUrl + '/exam/result', 'post', (options) => {
  let params = JSON.parse(options.body);
  let len = params.len;
  let score = Random.integer(0, len) * 10;
  let result = {
    score: score
  };
  if (len < 10) {
    result.score = 0;
    result.text = '未完成答题！通知家长';
  } else {
    if (score < 60) {
      result.text = '不哭不哭';
    } else if (score < 80) {
      result.text = '下次加油';
    } else if (score < 100) {
      result.text = '还可以高';
    } else {
      result.text = '这下牛皮了';
    }
  }
  return {
    'resultCode': '000000',
    'resultData': result,
    'resultMsg': 'success'
  };
});
