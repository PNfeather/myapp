<template>
  <app-page>
    <app-header :title="title">
    </app-header>
    <app-main v-model="scrollObj" class="main">
      <div style="height: 5rem">前置div</div>
      <tabs :scrollObj="scrollObj">
        <pane :key="item.name" v-for="item in panes" :label="item.label" :name="item.name">
          <div class="div">{{item.content}}</div>
        </pane>
      </tabs>
    </app-main>
  </app-page>
</template>

<script>
  import tabs from '@/components/BScrollTabs/tabs.vue';
  import pane from '@/components/BScrollTabs/pane.vue';
  export default {
    name: 'direct-test-page',
    data () {
      return {
        title: 'BscrollTabs测试页',
        scrollObj: '',
        panes: [
          {label: '标签1', name: '1', content: '内容1'},
          {label: '标签2', name: '2', content: '内容2'},
          {label: '标签3', name: '3', content: '内容3'},
          {label: '标签4', name: '4', content: '内容4'},
          {label: '标签5', name: '5', content: '内容5'},
          {label: '标签6', name: '6', content: '内容6'}
        ]
      };
    },
    methods: {
    },
    components: {
      tabs,
      pane
    }
  };
</script>

<style lang='less' scoped>
  .main{
    background-color: #fff;
  }
  .div{
    height: 20rem;
    width: 100%;
  }
</style>
