<template>
  <main class="main" ref="main">
    <div ref='wrapper'>
      <slot></slot>
    </div>
  </main>
</template>

<!--这是一个集成了betterScroll的主体组件-->

<script>
  import BScroll from 'better-scroll';
  import {watchResize} from '@/tools/common';
  import {mapState} from 'vuex';
  export default {
    name: 'app-main',
    props: {
      probeType: { // betterscroll 是否触发滚动事件参数
        type: Number,
        default: 3
      },
      canClick: { // betterscroll 是否触发点击事件参数
        type: Boolean,
        default: true
      },
      scrollX: { // betterscroll X轴能否滚动
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        main: '' // BScroll
      };
    },
    computed: {
      ...mapState(['isFirstRouter'])
    },
    methods: {
      initScroll () { // 初始化betterScroll
        this.main = new BScroll(this.$refs.main, {
          click: this.canClick,
          scrollX: this.scrollX,
          probeType: this.probeType
        });
        if (this.isFirstRouter) { // 如果为app加载的第一个页面则待页面resize后重加载betterscroll
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
      main () { // main定义变化则将改实例传出，并将改实例对应的Bscroll实例名称传出
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
