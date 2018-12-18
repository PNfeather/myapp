<template>
  <app-page>
    <app-header :title="title"></app-header>
    <app-main v-model="scrollObj">
      <tabs v-model="activeKey">
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
  import singleRowMode from './children/singleRowMode';
  export default {
    name: 'design-mode',
    data () {
      return {
        title: '设计模式',
        modeList: [
          {
            name: 1,
            label: '单列模式',
            template: singleRowMode
          }
        ],
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
    mounted () {}
  };
</script>

<style lang='less' scoped>
  #design-mode{

  }
</style>
