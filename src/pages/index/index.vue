<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="goDirectTestPage">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <main class="content">
    </main>
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
</style>
