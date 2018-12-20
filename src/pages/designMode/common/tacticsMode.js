import {getCss} from '@/tools/common';

let moveStyle = { // 缓动算法，t动画已消耗时间、b元素初始位置、c元素目标位置、d动画持续总时间
  linear: (t, b, c, d) => {
    return c * t / d + b;
  },
  easeIn: (t, b, c, d) => {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: (t, b, c, d) => {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: (t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: (t, b, c, d) => {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: (t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
};

let Move = function (dom) {
  this.dom = dom; // 移动元素
  this.startTime = 0; // 开始事件
  this.startPos = 0; // 开始位置
  this.endPos = 0; // 结束位置
  this.propertyName = null; // 元素变动属性
  this.easing = null; // 缓动算法
  this.duration = null; // 持续事件
};

Move.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date(); // 动画启动毫秒时间
  this.startPos = getCss(this.dom, propertyName).split('px')[0]; // 元素初始位置
  this.propertyName = propertyName;
  this.endPos = endPos;
  this.duration = duration;
  this.easing = moveStyle[easing];
  let self = this;
  let timer = setInterval(() => {
    if (self.step() === false) {
      clearInterval(timer);
    }
  }, 19);
};

Move.prototype.step = function () {
  let t = +new Date();
  if (t >= this.startTime + this.duration) {
    this.update(this.endPos);
    return false;
  }
  let pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
  this.update(pos);
};

Move.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + 'px';
};

export default Move;
