<template>
  <div class="mode">
    <div class="subTitle">迭代器模式</div>
    <p>目前前端框架多自带迭代器:</p>
    <p>以下通过js写一个对象数组公用迭代器:</p>
    <p>对象迭代：{{obj}}</p>
    <p>迭代后：{{objResult}}</p>
    <p>数组迭代：{{arr}}</p>
    <p>迭代后：{{arrResult}}</p>
  </div>
</template>

<script>
  import _each from '../common/iterationMode';
  export default {
    name: 'iteration-mode',
    data () {
      return {
        obj: {
          text: 'none',
          name: 'wu'
        },
        objResult: '',
        arr: ['hello', 'javaScript'],
        arrResult: ''
      };
    },
    methods: {},
    components: {},
    created () {},
    mounted () {
      _each(this.obj, (key, val) => {
        this.objResult = this.objResult + key + ',' + val + ',';
      });
      _each(this.arr, (index, item) => {
        this.arrResult = this.arrResult + index + ',' + item + ',';
      });
    }
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
  p{
    text-align: left;
    padding-left: .5rem;
    line-height: 1.2rem;
  }
</style>
