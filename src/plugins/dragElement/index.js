import Vue from 'vue';
// 拖拽结束自动靠边停方法
import autoStop from './methods';

// 元素拖拽指令
Vue.directive('dragElement', {
  // inserted插入指令，确保元素已经渲染完成
  inserted: function (el) {
    // 保存初始状态的变量
    let startX;
    let startY;
    const {
      // 存在定位的父级元素及其宽高（即元素可移动限制区域，先假设为parentNode，不是相对父级定位可以再调整）
      parentNode: {
        clientWidth: pW,
        clientHeight: pH
      },
      // 元素计算宽高(如果停靠不想完全靠边，可给元素添加对应padding)
      offsetWidth: eW,
      offsetHeight: eH
    } = el;

    // 触控开始事件
    el.addEventListener('touchstart', (event) => {
      // 1、如果元素上存在自定义的私有属性__VueDragTimer__，则清空该定时器
      // 2、__VueDragTimer__：自定义定时器属性，首尾双下划线挂载于元素上，方便在解绑指令时(unbind)清除定时器,并可删除属性
      if (el.__VueDragTimer__) clearInterval(el.__VueDragTimer__);
      // 通过touch属性计算获取初始位置
      const {pageX, pageY} = event.touches[0];
      const {
        // 元素距离限制区域上左距离,此变量需要实时获取
        offsetTop: eT,
        offsetLeft: eL
      } = el;
      startX = parseInt(pageX - eL);
      startY = parseInt(pageY - eT);
    });

    // 拖动事件
    el.addEventListener('touchmove', (event) => {
      // 添加阻止默认事件，防止影响到元素点击事件
      event.preventDefault();
      // 获取touch事件，计算并实时改变元素位置(拖拽效果)
      const {pageX, pageY} = event.touches[0];
      let movePageX = parseInt(pageX - startX);
      let movePageY = parseInt(pageY - startY);
      // 超出限制区域，禁止越界
      if (movePageX <= 0) {
        movePageX = 0;
      } else if (movePageX >= pW - eW) {
        movePageX = pW - eW;
      }
      if (movePageY <= 0) {
        movePageY = 0;
      } else if (movePageY >= pH - eH) {
        movePageY = pH - eH;
      }
      el.style.left = movePageX + 'px';
      el.style.top = movePageY + 'px';
    });

    // 拖拽结束，自动停靠
    el.addEventListener('touchend', () => {
      autoStop(el);
    });
  },

  // 解绑元素时，清除定时器并删除挂载在元素上的自定义定时器属性
  unbind: function (el) {
    if (el.__VueDragTimer__) clearInterval(el.__VueDragTimer__);
    delete el.__VueDragTimer__;
  }
});
