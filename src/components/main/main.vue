<template>
  <main class="main" ref="main">
    <div ref='wrapper'>
      <slot></slot>
    </div>
  </main>
</template>

<script>
  import BScroll from 'better-scroll';
  import {watchResize} from '@/tools/common';
  import {mapState} from 'vuex';
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
    computed: {
      ...mapState(['isFirstRouter'])
    },
    methods: {
      initScroll () {
        this.main = new BScroll(this.$refs.main, {
          click: this.canClick,
          scrollX: this.scrollX,
          probeType: this.probeType
        });
        if (this.isFirstRouter) {
          watchResize(this.scrollRefresh);
        }
        this.computedNeedRefresh();
      },
      scrollRefresh () {
        this.main && this.main.refresh();
      },
      computedNeedRefresh () { // 计算是否需要refresh
        this.main.on('scrollStart', () => {
          let maxY = Math.abs(this.main.maxScrollY);
          let currentY = Math.abs(this.$refs.wrapper.offsetHeight - this.$refs.main.offsetHeight);
          if (Math.abs(maxY - currentY) > 5) {
            this.main.refresh();
          }
        });
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initScroll();
      });
    },
    watch: {
      main () {
        this.$emit('input', {instance: this, BScrollName: 'main'});
      }
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
