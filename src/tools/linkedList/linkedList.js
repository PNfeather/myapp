function LinkedList () { // 链式列表
  let Node = function (element) {
    this.element = element;
    this.next = null;
  };
  let length = 0; // 私有变量长度
  let head = null; // 私有变量第一个元素
  // 链式调用尾部添加方法
  this.append = function (element) {
    let node = new Node(element);
    let current;
    if (head === null) {
      head = node;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };
  // 移除目标位置链
  this.removeAt = function (position) {
    // 检查界限
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  // 目标位置插入元素方法
  this.insert = function (position, element) {
    if (position > -1 && position < length) {
      let node = new Node(element);
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        node.next = head;
        head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  // 转换字符串方法
  this.toString = function () {
    let current = head;
    let string = '';
    while (current) {
      string += current.element + (current.next ? '\n' : '');
      current = current.next;
    }
    return string;
  };
  // 搜索目标方法
  this.indexOf = function (element) {
    let current = head;
    let index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };
  // 检验空方法
  this.isEmpty = function () {
    return length === 0;
  };
  // 获取链长度方法
  this.size = function () {
    return length;
  };
  // 获取链头方法
  this.getHead = function () {
    return head;
  };
  // 链调用
  let doLink = function (current) {
    if (current) {
      let el = current.element;
      if (typeof el === 'function') {
        el();
      } else {
        console.log(el);
      }
      return doLink(current.next);
    }
  };
  this.doLinkedList = function () {
    return doLink(head);
  };
};

export {LinkedList};
