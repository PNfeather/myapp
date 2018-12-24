import {isArrayLike} from '@/tools/common';

let _each = function (obj, callback) {
  let i = 0;
  let len = obj.length;
  let isArray = isArrayLike(obj);
  if (isArray) { // 迭代类数组
    for (; i < len; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) break;
    }
  } else {
    for (i in obj) { // 迭代object对象
      if (callback.call(obj[i], i, obj[i]) === false) break;
    }
  }
};

export default _each;
