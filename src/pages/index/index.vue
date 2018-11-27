<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="goDirectTestPage">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <app-main>
      <div class="div" v-for="(item, index) in [1, 2, 3, 4]" :key="index">这是内容{{index}}</div>
    </app-main>
  </app-page>
</template>

<script>
  export default {
    name: 'firstPage',
    data () {
      return {
        title: '首页'
      };
    },
    mounted () {
    },
    methods: {
      goDirectTestPage () {
        this.$router.push('directTestPage');
      }
    },
    components: {}
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
