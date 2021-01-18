/**
 * window.sessionStorage再封装
 * 需要在./config中注册后的字段才可以运行window.sessionStorage
 */
import {config} from './data';

const pre = 'myApp_';

const setItem = (name, value) => {
  return window.sessionStorage.setItem(pre + name, JSON.stringify(value));
};

const getItem = (name) => {
  return JSON.parse(window.sessionStorage.getItem(pre + name));
};

const removeItem = (name) => {
  return window.sessionStorage.removeItem(pre + name);
};

const storageFun = (method, ...args) => {
  const [name] = args;
  if (config.includes(name)) {
    return method(...args);
  } else {
    console.warn('当前字面量' + name + '未设置缓存，请在storage工具data中配置');
  }
};

const storage = {
  get (name) {
    return storageFun(getItem, name);
  },
  set (name, value) {
    return storageFun(setItem, name, value);
  },
  remove (name) {
    return storageFun(removeItem, name);
  }
};

export default storage;
