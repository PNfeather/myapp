<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)" :key="`tabs-bar${index}`">{{item.label}}</div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    value: {
      type: [String, Number]
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
    getTabs () {
      return this.$children.filter((item) => {
        return item.$options.name === 'pane';
      });
    },
    updateNav () {
      this.navList = [];
      let _this = this;
      this.getTabs().forEach((pane, index) => {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index
        });
        if (!pane.name) pane.name = index;
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index;
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
    currentValue () {
      this.updateStatus();
    }
  },
  components: {},
  created () {},
  mounted () {}
};
</script>

<style lang="less" scoped>
  .tabs{
    font-size: .7rem;
    color: #657180;
    .tabs-bar{
      .tabs-tab{
        display: inline-block;
        padding: .2rem .8rem;
        margin-right: .3rem;
        background: #fff;
        border: 1px solid #d7dde4;
        cursor: pointer;
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
    .tabs-content{
      padding: .4rem 0;
    }
  }
</style>
