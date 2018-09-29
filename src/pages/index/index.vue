<template>
  <main class="content">
    <div class="firstPage" @click="jumpTest" ref="test" v-longTouch="longTouch">
      <p>{{ msg }}</p>
      <p v-show="show" v-clickOutside="hideSelf">一个隐藏内容</p>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'firstPage',
    data () {
      return {
        msg: 'firstPage',
        show: false
      };
    },
    mounted () {
    },
    methods: {
      jumpTest () {
        this.$router.push({'path': '/test1'});
      },
      longTouch () {
        this.show = true;
      },
      hideSelf () {
        this.show = false;
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
</style>
