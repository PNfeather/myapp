<template>
  <app-page>
    <app-header :title="title"></app-header>
    <app-main v-model="scrollObj">
      <tabs v-model="activeKey">
        <pane label="标签1" name="1">
          标签一的内容
        </pane>
        <pane label="标签2" name="2">
          标签二的内容
        </pane>
        <pane label="标签3" name="3">
          标签三的内容
        </pane>
      </tabs>
    </app-main>
  </app-page>
</template>

<script>
  import tabs from '@/components/tabs/tabs.vue';
  import pane from '@/components/tabs/pane.vue';

  export default {
    name: 'click-tabs-test-pages',
    data () {
      return {
        title: 'tabs点击测试页',
        activeKey: '1',
        scrollObj: ''
      };
    },
    methods: {},
    components: {
      tabs,
      pane
    }
  };
</script>

<style lang='less' scoped>
  #click-tabs-test-pages {
  }
</style>
