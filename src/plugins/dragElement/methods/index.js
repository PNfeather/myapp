import _ from '@/plugins/lodash';

// 元素移动方法
let elMove = function (el, attr, targetLt) {
  let elLt;
  if (attr === 'left') elLt = el.offsetLeft;
  if (attr === 'top') elLt = el.offsetTop;
  let step = (targetLt - elLt) / 33;
  if (el.__VueDragTimer__) clearInterval(el.__VueDragTimer__);
  el.__VueDragTimer__ = setInterval(() => {
    if (Math.abs(targetLt - elLt) < Math.abs(step)) {
      el.style[attr] = targetLt + 'px';
      clearInterval(el.__VueDragTimer__);
      delete el.__VueDragTimer__;
    } else {
      elLt += step;
      el.style[attr] = elLt + 'px';
    }
  }, 5);
};

// 拖拽事件结束方法
let endDragMove = function (el) { // 距离上或下最小时满足距离小于50px才移动，否则左右取最小值移动
  let pageWidth = document.documentElement.clientWidth;
  let pageHeight = document.documentElement.clientHeight; // 限制区域宽高
  let toTop = el.offsetTop;
  let toLeft = el.offsetLeft; // 距离限制区域上左距离
  let elWidth = el.offsetWidth;
  let elHeight = el.offsetHeight; // 元素宽高
  let arr = [ // 定义移动数组
    { // 上移贴边对象
      moveType: 'top',
      targetLocation: 0,
      value: toTop,
      toggle: toTop <= 50
    }, { // 下移贴边对象
      moveType: 'top',
      targetLocation: pageHeight - elHeight,
      value: pageHeight - toTop - elWidth,
      toggle: pageHeight - toTop - elWidth <= 50
    }, { // 左移贴边对象
      moveType: 'left',
      targetLocation: 0,
      value: toLeft,
      toggle: true
    }, { // 右移贴边对象
      moveType: 'left',
      targetLocation: pageWidth - elWidth,
      value: pageWidth - toLeft - elWidth,
      toggle: true
    }
  ];
  arr = _.filter(arr, (o) => { // 筛选满足移动的对象的数组集合
    return o.toggle;
  });
  let obj = _.minBy(arr, 'value'); // 从满足移动的数组集合中取出需要移动距离最小的对象
  elMove(el, obj.moveType, obj.targetLocation);
};

export default {endDragMove};

export {endDragMove};
