<template>
  <section ref="wrapper">
    <div class="scrollWrapper">
      <section class="reloadingWaring" v-show="!reloading">松开刷新</section>
      <section class="tipsContent" v-show="reloading">
        <div class="reloading">
          <mt-spinner class="loadingIcon" type="snake"></mt-spinner>
          <p>刷新中...</p>
        </div>
      </section>
      <slot></slot>
      <section class="tipsContent" v-show="!reloading">
        <div v-if="noContent" class="noContent">当前没有内容</div>
        <div v-if="!noContent">
          <div v-show="!loading && !noMore" class="getMore">上拉加载更多</div>
          <div v-show="loading" class="loading">
            <mt-spinner class="loadingIcon" type="snake"></mt-spinner>
            <p>加载中...</p>
          </div>
          <div v-show="noMore" class="noMoreContent">-------- 没有更多内容了 --------</div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: true
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      noMore: {
        type: Boolean,
        default: false,
        required: true
      },
      loading: {
        type: Boolean,
        default: false,
        required: true
      },
      reloading: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data () {
      return {
        noContent: false
      };
    },
    mounted () {
      // 保证在DOM渲染完毕后初始化better-scroll
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return;
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        });

        // 是否派发滚动事件
        if (this.listenScroll) {
          let me = this;
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos);
          });
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd');
            }
          });
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown');
            }
          });
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll');
          });
        }
      },
      disable () { // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable();
      },
      enable () { // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable();
      },
      refresh () { // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh();
      },
      scrollTo () { // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement () { // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: { // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data: {
        handler () {
          this.$nextTick(() => {
            this.refresh();
            (!this.data.length && !this.reloading) && (this.noContent = true);
          });
        },
        deep: true
      }
    }
  };
</script>

<style lang='less' scoped>
  .tipsContent{
    margin: .5rem auto;
  }
  .getMore,.loading,.noMoreContent,.reloading,.reloadingWaring{
    color: #999;
  }
  .reloadingWaring{
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: -2.2rem;
    height: 1.6rem;
    line-height: 1.6rem;
  }
  .loadingIcon{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
