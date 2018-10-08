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

let addFunToOldFun = function (oldFun, addFun) {
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

export default {commonTime, addFunToOldFun};

export {commonTime, addFunToOldFun};
