<template>
  <main class="content">
    <div class="firstPage" @click="jumpTest" ref="test" v-longTouch="longTouch">
      <p>{{ msg }}</p>
      <p v-show="show" v-clickOutside="hideSelf">一个隐藏内容</p>
    </div>
    <div class="dragElement" v-dragElement @click="clickDragEl">
      <p>111</p>
      <p>222</p>
    </div>
  </main>
</template>

<script>
  import {delArrEl} from '@/tools/common';
  export default {
    name: 'firstPage',
    data () {
      return {
        msg: 'firstPage',
        show: false
      };
    },
    mounted () {
      console.log(this.del([1, 2, 2, 3], 2));
    },
    methods: {
      del (arr, val) {
        return delArrEl(arr, val);
      },
      jumpTest () {
        this.$router.push({'path': '/test1'});
      },
      longTouch () {
        this.show = true;
      },
      hideSelf () {
        this.show = false;
      },
      clickDragEl () {
        console.log('点击');
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  .dragElement{
    width: 3rem;
    height: 3rem;
    background: red;
    position: absolute;
    bottom: 0;right: 0;
  }
</style>
