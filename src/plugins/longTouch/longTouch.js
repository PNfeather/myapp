import Vue from 'vue'

Vue.directive('longTouch', {
  bind: function (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = 'longTouch表达式必须是函数'
      if (compName) { warn += `Found in component '${compName}' ` }
      console.warn(warn)
    }
    let pressTimer = null
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler()
        }, 1000)
      }
    }
    let cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    const handler = (e) => {
      binding.value(e)
    }
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
})
