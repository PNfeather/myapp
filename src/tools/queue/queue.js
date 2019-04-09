function Queue () { // 队列
  let items = [];
  // 列尾添加
  this.enqueue = function (element) {
    if (Array.isArray(element)) {
      items.push(...element);
    } else {
      items.push(element);
    }
  };
  // 列头删除
  this.dequeue = function () {
    return items.shift();
  };
  // 获取列头
  this.front = function () {
    return items[0];
  };
  this.isEmpty = function () {
    return items.length === 0;
  };
  this.size = function () {
    return items.length;
  };
  this.print = function () {
    console.log(items.toString());
  };
  this.clear = function () {
    items = [];
  };
};

export {Queue};
