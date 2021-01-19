/**
 * storage再封装
 * 需要在./data中注册后的字段才可以运行存储
 */
// 引入注册列表
import {config} from './data';

// 存储变量添加统一前缀(例如：项目_作者_ 下划线分割的方式)
const pre = 'project_author_';

// 存储方式 'localStorage' | 'sessionStorage'
const storageType = 'sessionStorage';

/**
 * 核心：阻止未注册字面量添加到存储中——装饰模式优化setItem方法
 * 考虑到没有添加就不会有获取和删除，所以只对setItem做处理
 */
const setOptimize = function (setItem) {
  return function (...args) {
    // setItem入参第一个为key
    const [key] = args;
    // 自定义注册列表config中，如果不包含当前key(需要截取掉自定义前缀)则阻止存入，并添加友善提示
    if (!config.includes(key.substr(pre.length))) {
      console.warn('当前字面量' + key + '未配置缓存，请在/src/tools/localStorage/data中注入属性');
    } else {
      // 如果已注册则直接返回原储存方法即可
      return setItem.apply(this, args);
    }
  };
};
// 获取原型并调用优化方法
Object.getPrototypeOf(window[storageType]).setItem = setOptimize(Object.getPrototypeOf(window[storageType]).setItem);

// 重写调用本地存储的方法，统一项目的调用方式
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
