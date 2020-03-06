import {config} from './data';

let pre = 'myAppName_';

function setItem (name, value) {
  Object.getPrototypeOf(localStorage).setToggle = true;
  return window.localStorage.setItem(pre + name, JSON.stringify(value));
}

function getItem (name) {
  return JSON.parse(window.localStorage.getItem(pre + name));
}

let storageConfig = [...config];

let storage = {
  get (name) {
    if (storageConfig.includes(name)) {
      return getItem(name);
    }
  },
  set (name, value) {
    if (storageConfig.includes(name)) {
      return setItem(name, value);
    }
  }
};

export default storage;
