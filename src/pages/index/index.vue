<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="goDirectTestPage">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <app-main v-model="scrollObj">
      <div style="height: 5rem" @click="goTest1">去test1</div>
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
    name: 'firstPage',
    data () {
      return {
        title: '首页',
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
    mounted () {
    },
    watch: {},
    methods: {
      goTest1 () {
        this.$router.push('test1');
      },
      goDirectTestPage () {
        this.$router.push('directTestPage');
      }
    },
    components: {
      tabs,
      pane
    }
  };
</script>
<style scoped lang="less">
  .icon-tiaozhuan{
    color: #5CD4FE;
    font-size: 1rem;
  }
  .div{
    height: 20rem;
    width: 100%;
  }
</style>
