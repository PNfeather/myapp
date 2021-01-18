/**
 * storage再封装
 * 需要注册后的字段才可以运行存储
 */
import {config} from './data';

const pre = 'myApp_';

// 存储方式 'localStorage' | 'sessionStorage'
const storageType = 'sessionStorage';

const setOptimize = (setItem) => {
  return function (...args) {
    const [key] = args;
    if (!config.includes(key.substr(pre.length))) {
      console.warn('当前字面量' + key + '未配置缓存，请在/src/tools/localStorage/data中注入属性');
    } else {
      return setItem.apply(window[storageType], arguments);
    }
  };
};
Object.getPrototypeOf(localStorage).setItem = setOptimize(Object.getPrototypeOf(localStorage).setItem);

const storage = {
  get (key) {
    return JSON.parse(window[storageType].getItem(pre + key));
  },
  set (key, value) {
    return window[storageType].setItem(pre + key, JSON.stringify(value));
  },
  remove (key) {
    return window[storageType].removeItem(pre + key);
  }
};

export default storage;
