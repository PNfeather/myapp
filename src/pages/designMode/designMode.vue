<template>
  <app-page>
    <app-header :title="title"></app-header>
    <app-main v-model="scrollObj">
      <tabs v-model="activeKey">
        <pane :label="`标签${item}`" :name="item" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="item">
          标签{{item}}的内容
        </pane>
      </tabs>
    </app-main>
  </app-page>
</template>

<script>
  import tabs from '@/components/clickTabs/tabs.vue';
  import pane from '@/components/clickTabs/pane.vue';
  export default {
    name: 'design-mode',
    props: {
      key: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        title: '设计模式',
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
