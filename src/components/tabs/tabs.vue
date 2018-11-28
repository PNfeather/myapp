<template>
  <div class="tabs" ref="tabs" v-findScroll="getScrollEl">
    <div class="assistDiv">
      <div class="tabs-bar" :class="{isFixed: navFixedToggle}">
        <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)" :key="`tabs-bar${index}`">{{item.label}}</div>
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import _ from '@/plugins/lodash';
import {scrollTo} from '@/tools/common';
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
      navList: [],
      navElTop: 0,
      scrollEl: null,
      scrollTimer: 0,
      scrollHeight: 0,
      navFixedToggle: false
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
      if (this.changeType === 'scroll') {
        this.calculateScrollData();
      }
      this.updateStatus();
    },
    updateStatus () {
      let tabs = this.getTabs();
      let _this = this;
      if (this.changeType === 'click') {
        tabs.forEach((tab) => {
          return (tab.show = tab.name === _this.currentValue);
        });
      }
    },
    handleChange (index) {
      let nav = this.navList[index];
      let name = nav.name;
      if (this.changeType === 'click') {
        this.currentValue = name;
        this.$emit('input', name);
        this.$emit('on-click', name);
      }
      if (this.changeType === 'scroll') {
        scrollTo(this.scrollEl, nav.scrollLimitMin, () => {
          this.currentValue = name;
        });
      }
    },
    calculateScrollData () {
      this.$nextTick(() => {
        let scrollElement = this.scrollEl;
        let scrollElHeight = parseInt(scrollElement.offsetHeight);
        let navElement = this.$el.getElementsByClassName('tabs-bar')[0];
        let navElHeight = parseInt(navElement.offsetHeight);
        this.navElTop = parseInt(navElement.offsetTop);
        this.scrollHeight = parseInt(scrollElement.scrollHeight);
        let panes = this.getTabs();
        _.forEach(panes, (item, index) => {
          let el = item.$el;
          this.navList[index].scrollLimitMin = Math.ceil(el.offsetTop - navElHeight);
          this.navList[index].scrollLimitMax = el.offsetTop + el.offsetHeight - navElHeight;
        });
        let lastPane = panes[panes.length - 1].$el;
        let lastPaneTop = parseInt(lastPane.offsetTop);
        if (this.scrollHeight - lastPaneTop < scrollElHeight) {
          let lastElement = this.scrollEl.lastElementChild;
          if (this.scrollEl.lastElementChild === this.$refs.tabs) {
            lastElement = lastPane;
          }
          lastElement.style.height = lastElement.offsetHeight + (scrollElHeight - (this.scrollHeight - lastPaneTop)) - navElHeight + 5 + 'px';
        }
      });
    },
    setScrollWatch () {
      let _this = this;
      let scrollElement = this.scrollEl;
      scrollElement.addEventListener('scroll', () => {
        if (this.scrollHeight !== parseInt(scrollElement.scrollHeight)) {
          this.scrollHeight = parseInt(scrollElement.scrollHeight);
          this.calculateScrollData();
        }
        let scrollTop = Math.ceil(scrollElement.scrollTop);
        if (this.navElTop > scrollTop) {
          this.navFixedToggle = false;
        } else {
          this.navFixedToggle = true;
        }
        _.forEach(_this.navList, (item) => {
          if (scrollTop >= item.scrollLimitMin && scrollTop < item.scrollLimitMax) {
            this.currentValue = item.name;
          }
        });
      });
    },
    getScrollEl () {
      this.scrollEl = arguments[1];
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    },
    currentValue () {
      this.updateStatus();
    }
  },
  components: {},
  created () {},
  mounted () {
    if (this.changeType === 'scroll') {
      this.$nextTick(() => {
        this.setScrollWatch();
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .tabs{
    font-size: .7rem;
    color: #657180;
    .assistDiv{
      height: 2rem;
      .isFixed{
        position: fixed;
        top: 2.25rem;
        left: 0;
        right: 0;
      }
      .tabs-bar{
        height: 2rem;
        padding: .2rem 0;
        background: #f1f1f1;
        z-index: 999;
        .tabs-tab{
          height: 1.6rem;
          display: inline-block;
          padding: .2rem .8rem;
          margin-right: .3rem;
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
        &:after{
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: #d7dde4;
          margin-top: -1px;
        }
      }
    }
    .tabs-content{
      padding: .4rem 0;
    }
  }
</style>
