<template>
  <div class="firstPage" @click="jumpTest" ref="test" v-longTouch="longTouch">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: 'firstPage',
    data () {
      return {
        msg: 'firstPage'
      };
    },
    mounted () {
    },
    methods: {
      jumpTest () {
        this.$router.push({'path': '/test1'});
      },
      longTouch () {
        console.log('长按');
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  .firstPage {
    p{
      font-size: 2rem;
    }
  }
</style>
