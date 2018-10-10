import Vue from 'vue';
import {getCss} from '@/tools/common';

Vue.directive('findScroll', {
  inserted: function (el, binding) {
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
