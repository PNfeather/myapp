<template>
  <div class="tabs">
    <div class="assistDiv">
      <div class="tabs-bar">
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
      scrollTimer: 0,
      scrollHeight: 0
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
        let scrollElement = document.getElementById('scrollTabsElement');
        if (this.scrollTimer) clearInterval(this.scrollTimer);
        this.scrollTimer = setInterval(() => {
          if (Math.abs(scrollElement.scrollTop - nav.scrollLimitMin) < 10) {
            scrollElement.scrollTop = nav.scrollLimitMin;
            this.currentValue = name;
            clearInterval(this.scrollTimer);
            return false;
          } else {
            scrollElement.scrollTop -= (scrollElement.scrollTop - nav.scrollLimitMin) / 10;
          }
        }, 20);
      }
    },
    calculateScrollData () {
      this.$nextTick(() => {
        let scrollElement = document.getElementById('scrollTabsElement');
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
        let lastPaneTop = parseInt(lastPane.offsetHeight);
        if (lastPaneTop < scrollElHeight) {
          lastPane.style.marginBottom = scrollElHeight - lastPaneTop - navElHeight + 'px';
        }
      });
    },
    setScrollWatch () {
      let _this = this;
      let scrollElement = document.getElementById('scrollTabsElement');
      let navElement = this.$el.getElementsByClassName('tabs-bar')[0];
      scrollElement.addEventListener('scroll', () => {
        if (this.scrollHeight !== parseInt(scrollElement.scrollHeight)) {
          this.scrollHeight = parseInt(scrollElement.scrollHeight);
          this.calculateScrollData();
        }
        let scrollTop = Math.ceil(scrollElement.scrollTop);
        if (this.navElTop > scrollTop) {
          navElement.style.position = 'static';
        } else {
          navElement.style.position = 'fixed';
          navElement.style.top = '2.25rem';
          navElement.style.left = '0';
          navElement.style.right = '0';
        }
        _.forEach(_this.navList, (item) => {
          if (scrollTop >= item.scrollLimitMin && scrollTop < item.scrollLimitMax) {
            this.currentValue = item.name;
          }
        });
      });
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
