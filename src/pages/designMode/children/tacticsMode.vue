<template>
  <div class="mode">
    <div class="subTitle">策略模式</div>
    <input type="text" v-model="test">
    <div @click="calculate">计算</div>
  </div>
</template>

<script>
  export default {
    name: 'template-mode',
    data () {
      return {
        test: ''
      };
    },
    methods: {
      calculate () {
        console.log(this.test);
      }
    },
    components: {},
    created () {},
    mounted () {}
  };
</script>

<style lang='less' scoped>
  @import '~@/style/common.less';
  .subTitle{
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: .85rem;
    margin-top: -.7rem;
  }
</style>
