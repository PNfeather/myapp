<template>
  <app-page id="design-mode">
    <app-header :title="title" :borderNone="true"></app-header>
    <app-main v-model="scrollObj">
      <tabs v-model="activeKey" class="wrapper">
        <pane :label="item.label" :name="item.name" v-for="item in modeList" :key="item.name">
          <component :is="item.template"></component>
        </pane>
      </tabs>
    </app-main>
  </app-page>
</template>

<script>
  import tabs from '@/components/clickTabs/tabs.vue';
  import pane from '@/components/clickTabs/pane.vue';
  import { config } from './data';
  export default {
    name: 'design-mode',
    data () {
      return {
        title: '设计模式',
        modeList: [...config],
        activeKey: 1,
        scrollObj: ''
      };
    },
    methods: {},
    components: {
      tabs,
      pane
    },
    created () {},
    mounted () {
      this.$nextTick(() => {
        this.activeKey = 4;
      });
    }
  };
</script>

<style lang='less' scoped>
  #design-mode{
    .wrapper{
      margin-top: .2rem;
    }
  }
</style>
