<template>
  <div class="tabs" ref="tabs">
    <div class="tabs-bar" :style="{'transform': `translateY(${navFixedTop}px)`}" ref="titleBar">
      <ul class="tabs-bar-ul" :class="[navList.length <= 4 ? 'around' : 'start']" ref="wrapper">
        <li class="tabs-bar-li" v-for="(item, index) in navList" :ref="`tabs-bar-li-${item.name}`" :key="`tabs-bar-li-${item.name}`" @click="handleChange(index)">
          <div :class="tabCls(item)">
            {{item.label}}
          </div>
        </li>
      </ul>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<!--这是一个集成了betterScroll的滚动切换组件-->

<script>
import _ from '@/plugins/lodash';
import {watchResize} from '@/tools/common';
import BScroll from 'better-scroll';
import {mapState} from 'vuex';
export default {
  name: 'tabs',
  props: {
    value: { // 点击头部标签
      type: [String, Number]
    },
    scrollObj: { // 父级betterScroll实例传出对象
      type: [String, Object]
    }
  },
  data () {
    return {
      currentValue: this.value, // 获取当前点击头部的value值
      copyBScroll: null, // 获取父级betterScroll对象
      copyScrollEl: null, // 获取父级betterScroll元素
      titleScroll: '', // 头部标签左右滚动betterScroll对象
      navList: [], // 头部数据缓存数组
      navElTop: 0, // 头部标签距离copyScrollEl头部边线的距离
      scrollHeight: 0, // copyScrollEl的滚动区域
      navFixedTop: 0, // 滚动后头部定位位置
      reScroll: false // 确认滚动是否计算完好
    };
  },
  methods: {
    tabCls (item) { // 获取头部样式
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ];
    },
    getTabs () { // 获取子类pane实例
      return this.$children.filter((item) => {
        return item.$options.name === 'pane';
      });
    },
    updateNav () { // 计算navList，及滚动相关数据
      this.navList = [];
      _.forEach(this.getTabs(), (pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        });
        if (!pane.name) pane.name = index;
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = pane.name || index;
          }
        }
      });
      this.calculateScrollData();
    },
    loadTitleScroll () { // 初始化头部betterScroll或重加载
      if (this.titleScroll) {
        this.titleScroll.refresh();
      } else {
        this.titleScroll = new BScroll(this.$refs.titleBar, {
          scrollX: true
        });
      }
    },
    computedNeedRefresh () { // 计算是否需要refresh
      let maxY = Math.abs(this.titleScroll.maxScrollX);
      let currentY = Math.abs(this.$refs.wrapper.offsetWidth - this.$refs.titleBar.offsetWidth);
      if (Math.abs(maxY - currentY) > 5) {
        this.main.refresh();
      }
    },
    handleChange (index) { // 点击头部切换
      this.reScroll = false;
      let nav = this.navList[index];
      let name = nav.name;
      this.currentValue = name;
      this.copyBScroll.stop();
      this.copyBScroll.scrollTo(0, -this.navList[index].scrollLimitMin, 400);
      setTimeout(() => {
        if (this.reScroll) {
          this.handleChange(index);
        };
      }, 20);
    },
    calculateScrollData () { // 计算每个pane所占用的高度区域，最后一个不足屏幕时补足
      this.$nextTick(() => {
        let navElement = this.$refs.titleBar;
        let navElHeight = parseInt(navElement.offsetHeight);
        this.navElTop = parseInt(navElement.offsetTop);
        let panes = this.getTabs();
        _.forEach(panes, (item, index) => {
          let el = item.$el;
          this.navList[index].scrollLimitMin = Math.ceil(el.offsetTop - navElHeight);
          this.navList[index].scrollLimitMax = el.offsetTop + el.offsetHeight - navElHeight;
        });
        if (!this.copyBScroll) return false;
        let scrollElHeight = parseInt(this.copyBScroll.wrapperHeight);
        this.scrollHeight = parseInt(this.copyBScroll.scrollerHeight);
        let lastPane = panes[panes.length - 1].$el;
        let lastPaneTop = parseInt(lastPane.offsetTop);
        if (this.scrollHeight - lastPaneTop < scrollElHeight) {
          let lastElement = this.copyScrollEl.lastElementChild;
          if (this.copyScrollEl.childNodes[0].lastElementChild === this.$refs.tabs) {
            lastElement = lastPane;
          }
          lastElement.style.height = lastElement.offsetHeight + (scrollElHeight - (this.scrollHeight - lastPaneTop)) - navElHeight + 5 + 'px';
        }
      });
    },
    setScrollWatch () { // 设置滚动相关监听
      let _this = this;
      this.copyBScroll.on('scrollEnd', ({y}) => {
        if (_this.navElTop || _this.navElTop === 0) {
          let scrollTop = Math.ceil(Math.abs(y));
          if (_this.navElTop > scrollTop) {
            _this.navFixedTop = 0;
          } else {
            _this.navFixedTop = Math.abs(y) - _this.navElTop;
          }
          _.forEach(_this.navList, (item) => {
            if (scrollTop >= item.scrollLimitMin && scrollTop < item.scrollLimitMax) {
              _this.currentValue = item.name;
            }
          });
        }
      });
      this.copyBScroll.on('scroll', () => {
        if (_this.scrollHeight !== parseInt(_this.copyBScroll.scrollerHeight)) {
          this.reScroll = true;
          _this.scrollHeight = parseInt(_this.copyBScroll.scrollerHeight);
          _this.calculateScrollData();
        }
        _this.navFixedTop = 0;
      });
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    },
    currentValue (val) { // 头部标签左右自动滚动
      this.titleScroll && this.titleScroll.scrollToElement(this.$refs['tabs-bar-li-' + val][0], 400, true, 0);
    },
    scrollObj (val) { // 获取父级betterScroll数据
      this.copyBScroll = val.instance[val.BScrollName];
      this.copyScrollEl = val.instance.$el;
      this.setScrollWatch();
    },
    navList () {
      this.loadTitleScroll();
    }
  },
  computed: {
    ...mapState(['isFirstRouter'])
  },
  components: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      if (this.isFirstRouter) { // 如果是APP第一次加载页面则在界面resize后重加载betterscroll
        watchResize(this.loadTitleScroll);
      }
    });
  }
};
</script>

<style lang="less" scoped>
  .tabs{
    font-size: .7rem;
    color: #657180;
    .tabs-bar{
      height: 1.6rem;
      width: 100%;
      background: #f1f1f1;
      z-index: 1;
      overflow: hidden;
      position: relative;
      &:after{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #d7dde4;
        margin-top: -1px;
        position: absolute;
        bottom: 0;
        z-index: -1;
      }
      .around{
        justify-content: space-around;
      }
      .start{
        justify-content: flex-start;
      }
      .tabs-bar-ul{
        position: absolute;
        height: 100%;
        min-width: 100%;
        display: flex;
        flex-wrap: nowrap;
        .tabs-bar-li{
          height: 100%;
          padding: 0 .3rem;
          .tabs-tab{
            flex: 0 0 4rem;
            min-width: 4rem;
            max-width: 4rem;
            height: 1.6rem;
            display: inline-block;
            padding: .2rem .8rem;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background: #fff;
            border: 1px solid #d7dde4;
            position: relative;
          }
          .tabs-tab-active{
            color: #3399ff;
            border-top:1px solid #3399ff;
            border-bottom:1px solid #fff;
            &:before{
              content: '';
              display: block;
              height: 1px;
              background: #3399ff;
              position: absolute;
              top: 0;
              right: 0;
              left: 0;
            }
          }
        }
      }
    }
    .tabs-content{
      padding: .4rem 0;
    }
  }
</style>
