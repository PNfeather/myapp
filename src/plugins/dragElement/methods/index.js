// 元素移动方法
const autoMove = function (el, changeAttr, endValue) {
  // 定义 起点、运动中当前位置 变量
  let currentValue;
  const {
    // 元素距离限制区域上左距离
    offsetTop: eT,
    offsetLeft: eL
  } = el;
  // 改变属性为 'left' 时，起点赋值为：元素与限制区左边的距离
  if (changeAttr === 'left') currentValue = eL;
  // 改变属性为 'top' 时，起点赋值为：元素与限制区上边的距离
  if (changeAttr === 'top') currentValue = eT;
  // 移动步距设置为 终点与起点 距离的 1 / 33，值的正负表示移动方向
  const step = (endValue - currentValue) / 33;
  // 定时器存在则清除处理
  if (el.__VueDragTimer__) clearInterval(el.__VueDragTimer__);
  // 设置自动停靠定时器
  el.__VueDragTimer__ = setInterval(() => {
    // 若当前位置与终点差值 已经 小于步距，则直接定位到终点位置(js计算精度导致此判断不可少)，否则缩小步距的距离
    if (Math.abs(endValue - currentValue) < Math.abs(step)) {
      el.style[changeAttr] = endValue + 'px';
      clearInterval(el.__VueDragTimer__);
      delete el.__VueDragTimer__;
    } else {
      currentValue += step;
      el.style[changeAttr] = currentValue + 'px';
    }
  }, 5);
};

/**
 * 自动停靠方法：
 * 停靠原则
 * 1、默认左右停靠开关永久开启
 * 2、上下停靠开关在距离上下<=50像素时开启
 * 3、最终移动方向：从停靠开关开启的方向中，取需要移动距离最小的方向
 */
const autoStop = function (el) {
  const {
    // 存在定位的父级元素及其宽高（即元素可移动限制区域，先假设为parentNode，不是相对父级定位可以再调整）
    parentNode: {
      clientWidth: pW,
      clientHeight: pH
    },
    // 元素距离限制区域上左距离
    offsetTop: eT,
    offsetLeft: eL,
    // 元素计算宽高(如果停靠不想完全靠边，可给元素添加对应padding)
    offsetWidth: eW,
    offsetHeight: eH
  } = el;
  /**
   * 停靠配置
   * changeAttr: 当前配置方案改变的元素属性 'top'| 'left'
   * endValue: 停靠动画结束时，需要改变的属性的值(终点)
   * distance：当前配置，距离目标结束位置的距离
   * toggle: 配置开启开关
   */
  const stopConfigs = [
    { // 上移贴边配置
      changeAttr: 'top',
      endValue: 0,
      distance: eT,
      toggle: eT <= 50
    }, { // 下移贴边配置
      changeAttr: 'top',
      endValue: pH - eH,
      distance: pH - eT - eH,
      toggle: pH - eT - eH <= 50
    }, { // 左移贴边配置
      changeAttr: 'left',
      endValue: 0,
      distance: eL,
      toggle: true
    }, { // 右移贴边配置
      changeAttr: 'left',
      endValue: pW - eW,
      distance: pW - eL - eW,
      toggle: true
    }
  ];
  // 先重配置中选出开关为true的，然后按distance排序后选出其值最小的配置，并获取对应的changeAttr、endValue
  const {changeAttr, endValue} = stopConfigs.filter(o => o.toggle).sort((a, b) => a.distance - b.distance)[0];
  autoMove(el, changeAttr, endValue);
};

export default autoStop;
