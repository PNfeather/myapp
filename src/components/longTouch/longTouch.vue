<template>
    <div class="longTouch" @touchstart="longTouchStart" @touchend="longTouchEnd" ref="child"></div>
</template>

<script>
export default {
  name: 'longTouch',
  props: {
  },
  data () {
    return {
      timer: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      let child = this.$refs.child
      let parent = child.parentNode
      let parentStyle = this.getCss(parent)
      if (parentStyle.position === 'static') {
        parent.style.position = 'relative'
      }
    })
  },
  methods: {
    longTouchStart () {
      this.timer = setTimeout(() => {
        this.callBack()
      }, 1500)
    },
    longTouchEnd () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    callBack () {
      this.$emit('callBack')
    },
    getCss (ele) {
      if (ele.currentStyle) {
        return ele.currentStyle
      } else {
        return window.getComputedStyle(ele, null)
      }
    }
  }
}
</script>

<style scoped>
.longTouch{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
