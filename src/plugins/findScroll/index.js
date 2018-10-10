import Vue from 'vue';
import {getCss} from '@/tools/common';

Vue.directive('findScroll', {
  inserted: function (el, binding) { // 获取当前元素第一个能滚动的父元素的指令，并以当前元素及找到的父元素为参数执行表达式
    let targetEl = el;
    (function getScroll (element) {
      if (element.nodeName !== 'BODY') {
        if (getCss(element, 'overflow') === 'auto' || getCss(el, 'overflow') === 'scroll') {
          binding.value(targetEl, element);
        } else {
          getScroll(element.parentNode);
        }
      } else {
        return false;
      }
    })(el);
  }
});
