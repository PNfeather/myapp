<template>
  <div class="tabs" ref="tabs">
    <div class="tabs-bar" ref="titleBar">
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

<!--这是一个头部集成了bscroll的点击切换组件-->

<script>
import _ from '@/plugins/lodash';
import BScroll from 'better-scroll';
export default {
  name: 'tabs',
  props: {
    value: {
      type: [String, Number]
    },
    changeType: {
      type: String,
      default: 'click'
    }
  },
  data () {
    return {
      currentValue: this.value,
      navList: []
    };
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ];
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
    getTabs () {
      return this.$children.filter((item) => {
        return item.$options.name === 'pane';
      });
    },
    updateNav () {
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
      this.updateStatus();
    },
    updateStatus () {
      let tabs = this.getTabs();
      let _this = this;
      tabs.forEach((tab) => {
        return (tab.show = tab.name === _this.currentValue);
      });
    },
    handleChange (index) {
      let nav = this.navList[index];
      let name = nav.name;
      this.currentValue = name;
      this.$emit('input', name);
      this.$emit('on-click', name);
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    },
    currentValue (val) {
      this.updateStatus();
      this.titleScroll && this.titleScroll.scrollToElement(this.$refs['tabs-bar-li-' + val][0], 400, true, 0);
    },
    navList: {
      handler () {
        this.loadTitleScroll();
      },
      deep: true
    }
  },
  components: {},
  created () {},
  mounted () {
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
            padding: .2rem 0;
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
