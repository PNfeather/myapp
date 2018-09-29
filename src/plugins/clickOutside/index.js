import Vue from 'vue';

Vue.directive('clickOutside', { // 点击元素之外事件(显隐控制需给触发显示元素的点击事件添加stop修饰)
  bind: function (el, binding) {
    function documentHandler (e) {
      if (el.contains(e.target)) { // 指令添加元素包含点击目标元素
        return false;
      }
      if (binding.expression) { // 指令绑定有表达式
        binding.value(e); // 执行表达式
      }
    }
    el.__vueClickOutside__ = documentHandler; // 将方法绑定到元素上，方便解绑是移除事件监听
    document.addEventListener('click', documentHandler);
  },
  unbind: function (el) { // 解绑元素移除鉴定，元素的事件绑定
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
});
