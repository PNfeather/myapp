let commonTime = {
  // 获取当前时间戳
  getUnix: function () {
    let date = new Date();
    return date.getTime();
  },
  // 获取今天 0 点 0 分 0 秒的时间戳
  getTodayUnix: function () {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取今年 1 月 1 日 0 点 0 分 0 秒的时间戳
  getYearUnix: function () {
    let date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取标准年月日
  getLastDate: function (time) {
    let date = new Date(time);
    let month = date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  },
  // 时间转换
  getFormatTime: function (timestamp) {
    let now = this.getUnix(); // 当前时间戳
    let today = this.getTodayUnix(); // 今天 0 点时间戳
    let secondTime = (now - timestamp) / 1000; // 距离现在的描述
    let tips = '';
    if (secondTime <= 0) {
      tips = '刚刚';
    } else if (Math.floor(secondTime / 60) <= 0) {
      tips = '刚刚';
    } else if (secondTime < 3600) {
      tips = Math.floor(secondTime / 60) + '分钟前';
    } else if (secondTime >= 3600 && (timestamp - today >= 0)) {
      tips = Math.floor(secondTime / 3600) + '小时前';
    } else if (secondTime / 86400 <= 31) {
      tips = Math.ceil(secondTime / 86400) + '天前';
    } else {
      tips = this.getLastDate(timestamp);
    }
    return tips;
  }
};

let addFunToOldFun = function (oldFun, addFun) { // 给方法添加方法
  let fun = oldFun;
  if ((typeof oldFun) === 'function') {
    return () => {
      fun();
      addFun();
    };
  } else {
    return addFun;
  }
};

let getCss = function (obj, attribute) { // 获取元素css属性
  if (obj.currentStyle) {
    return obj.currentStyle[attribute];
  } else {
    return window.getComputedStyle(obj, null)[attribute];
  }
};

let EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) { // DOM2级
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) { // DOM1级
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler; // DOM0级
    }
  },
  removeHandler: function (element, type, handler) { // 类似addHandler
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  }
};

// 删除数组指定值元素
let delArrEl = function (arr, someEl) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[0] !== someEl) {
      arr.push(arr[0]);
    }
    arr.shift(arr[0]);
  }
  return arr;
};

// 将元素滚动到目标位置
let scrollTo = function (scrollEl, targetLt, callback) {
  if (scrollEl.__VueScrollTimer__) clearInterval(scrollEl.__VueScrollTimer__);
  scrollEl.__VueScrollTimer__ = setInterval(() => {
    if (Math.abs(scrollEl.scrollTop - targetLt) < 50) {
      scrollEl.scrollTop = targetLt;
      if (callback) callback();
      clearInterval(scrollEl.__VueScrollTimer__);
      delete scrollEl.__VueScrollTimer__;
    } else {
      scrollEl.scrollTop -= (scrollEl.scrollTop - targetLt) / 10;
    }
  }, 20);
};

// 属性变化
let arrMove = function (el, attr, targetLt) {
  let elLt;
  if (attr === 'left') elLt = el.offsetLeft;
  if (attr === 'top') elLt = el.offsetTop;
  if (el.__VueDragTimer__) clearInterval(el.__VueDragTimer__);
  el.__VueDragTimer__ = setInterval(() => {
    if (Math.abs(elLt - targetLt) < 5) {
      el.style[attr] = targetLt + 'px';
      clearInterval(el.__VueDragTimer__);
      delete el.__VueDragTimer__;
    } else {
      elLt -= (elLt - targetLt) / 40;
      el.style[attr] = elLt + 'px';
    }
  }, 5);
};

// 添加页面加载完成事件
let addLoadEvent = function (fun) {
  let olderOnload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = fun;
  } else {
    window.onload = function () {
      olderOnload();
      fun();
    };
  }
};

export default {commonTime, addFunToOldFun, getCss, EventUtil, delArrEl, scrollTo, arrMove, addLoadEvent};

export {commonTime, addFunToOldFun, getCss, EventUtil, delArrEl, scrollTo, arrMove, addLoadEvent};
