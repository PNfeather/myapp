import Vue from 'vue';
import {arrMove} from '@/tools/common';

Vue.directive('dragElement', {
  bind: function (el) {
    let startX;
    let startY;
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;
    el.addEventListener('touchstart', (event) => {
      if (el.__VueDragTimer__) clearInterval(el.__VueDragTimer__);
      let touch = event.touches[0];
      startX = parseInt(touch.pageX - el.offsetLeft);
      startY = parseInt(touch.pageY - el.offsetTop);
    });
    el.addEventListener('touchmove', (event) => {
      event.preventDefault();
      let touch = event.touches[0];
      let movePageX = parseInt(touch.pageX - startX);
      let movePageY = parseInt(touch.pageY - startY);
      if (movePageX <= 0) {
        movePageX = 0;
      } else if (movePageX >= pageWidth - el.offsetWidth) {
        movePageX = pageWidth - el.offsetWidth;
      }
      if (movePageY <= 0) {
        movePageY = 0;
      } else if (movePageY >= pageHeight - el.offsetHeight) {
        movePageY = pageHeight - el.offsetHeight;
      }
      el.style.left = movePageX + 'px';
      el.style.top = movePageY + 'px';
    });
    el.addEventListener('touchend', () => {
      if (el.offsetTop <= 100) {
        arrMove(el, 'top', 0);
      } else if (pageHeight - (el.offsetTop - 0 + el.offsetHeight) <= 100) {
        arrMove(el, 'top', (pageHeight - el.offsetHeight));
      } else {
        if ((el.offsetLeft - 0 + el.offsetWidth / 2) <= (pageWidth / 2)) {
          arrMove(el, 'left', 0);
        } else {
          arrMove(el, 'left', (pageWidth - el.offsetWidth));
        }
      }
    });
  },
  unbind: function (el) {
    delete el.__VueDragTimer__;
  }
});
