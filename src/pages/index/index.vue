<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="goDirectTestPage">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <app-main v-model="scrollEl">
      <div class="content">
        <div style="height: 1rem"></div>
        <tabs v-model="activeKey" :scrollObj="scrollEl" :changeType="`scroll`">
          <pane :key="item.name" v-for="item in panes" :label="item.label" :name="item.name">
            <div class="div">{{item.content}}</div>
          </pane>
        </tabs>
      </div>
    </app-main>
  </app-page>
</template>

<script>
  import tabs from '@/components/tabs/tabs.vue';
  import pane from '@/components/tabs/pane.vue';
  export default {
    name: 'firstPage',
    data () {
      return {
        title: '首页',
        activeKey: 1,
        scrollEl: '',
        panes: [
          {label: '标签1', name: '1', content: '内容1'},
          {label: '标签2', name: '2', content: '内容2'},
          {label: '标签3', name: '3', content: '内容3'},
          {label: '标签4', name: '4', content: '内容4'}
        ]
      };
    },
    mounted () {
    },
    watch: {
    },
    methods: {
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
