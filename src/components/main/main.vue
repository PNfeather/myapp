<template>
  <main class="main" ref="main">
    <div ref='wrapper'>
      <slot></slot>
    </div>
  </main>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: 'app-main',
    props: {
      probeType: {
        type: Number,
        default: 3
      },
      canClick: {
        type: Boolean,
        default: true
      },
      scrollX: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        main: ''
      };
    },
    methods: {
      initScroll () {
        this.main = new BScroll(this.$refs.main, {
          click: this.canClick,
          scrollX: this.scrollX,
          probeType: this.probeType
        });
        this.main.on('scrollStart', () => {
          this.computedNeedRefresh();
        });
      },
      refresh () {
        this.main && this.main.refresh();
      },
      scrollTo () {
        this.main && this.main.scrollTo.apply(this.main, arguments);
      },
      scrollToElement () {
        this.main && this.main.scrollToElement.apply(this.main, arguments);
      },
      computedNeedRefresh () { // 计算是否需要refresh
        let maxY = Math.abs(this.main.maxScrollY);
        let currentY = Math.abs(this.$refs.wrapper.offsetHeight - this.$refs.main.offsetHeight);
        if (Math.abs(maxY - currentY) > 5) {
          this.refresh();
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initScroll();
      });
    }
  };
</script>

<style lang='less' scoped>
  .main{
    position: absolute;
    top: 0;right: 0;
    bottom: 0;left: 0;
    overflow: hidden;
  }
</style>
