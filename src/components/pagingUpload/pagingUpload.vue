<template>
  <section ref="scrollEl">
    <div class="scrollWrapper">
      <slot></slot>
      <div class="noMoreContent">没有更多内容了</div>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: 'paging-upload',
    props: {
      canClick: { // 可以点击
        type: Boolean,
        default: true
      },
      scrollX: { // X轴滚动
        type: Boolean,
        default: false
      },
      probeType: { // better滚动触发机制
        type: Number,
        default: 3
      },
      listenScroll: { // 默认不监听滚动
        type: Boolean,
        default: false
      },
      noMore: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        pagingUpload: ''
      };
    },
    methods: {
      initScroll () {
        if (!this.$refs.scrollEl) {
          return false;
        }
        this.pagingUpload = new BScroll(this.$refs.scrollEl, {
          click: this.canClick,
          scrollX: this.scrollX,
          scrollY: true,
          probeType: 3
        });
        if (this.listenScroll) {
        }
      }
    },
    components: {},
    created () {
    },
    mounted () {
    }
  };
</script>

<style lang='less' scoped>
  #paging-upload {

  }
</style>
