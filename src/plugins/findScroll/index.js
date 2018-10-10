import Vue from 'vue';
import {getCss} from '@/tools/common';

Vue.directive('findScroll', {
  inserted: function (el, binding) { // 获取当前元素第一个能滚动的父元素的指令，并以当前元素及找到的父元素为参数执行表达式
    let targetEl = el;
    (function goTop (scrollEl) {
      if (scrollEl) {
        if (getCss(scrollEl, 'overflow') === 'auto' || getCss(el, 'overflow') === 'scroll') {
          binding.value(targetEl, scrollEl);
        } else {
          goTop(scrollEl.parentNode);
        }
      } else {
        return false;
      }
    })(el);
  }
});
