<template>
  <app-page>
    <app-header :title="title" :needBack="false"></app-header>
    <main class="content">
      <div class="firstPage" @click="jumpTest1('normal')" v-longTouch="longTouch">
        <p>{{ msg }}</p>
        <p v-show="show" v-clickOutside="hideSelf" @click="jumpTest1()">这是一个作者通道</p>
      </div>
      <div class="dragElement" v-dragElement @click="clickDragEl">
        <p>神奇按钮</p>
      </div>
    </main>
  </app-page>
</template>

<script>
  import {delArrEl} from '@/tools/common';
  export default {
    name: 'firstPage',
    data () {
      return {
        title: '首页',
        msg: '跳转',
        show: false
      };
    },
    mounted () {
      console.log(delArrEl([1, 2, 2, 3], 2));
    },
    methods: {
      jumpTest1 (type) {
        if (type === 'normal') {
          if (this.$store.state.numA < 20) {
            return false;
          }
        }
        this.$router.push({'path': '/test1'});
      },
      longTouch () {
        this.show = true;
      },
      hideSelf () {
        this.show = false;
      },
      clickDragEl () {
        this.$toast('点击10次神奇按钮或者长按跳转可以到达第二页');
        this.$store.dispatch('getNumAndChange', {'numType': 'numA', 'value': 2});
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  .dragElement{
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background: #5CD4FE;
    position: absolute;
    bottom: 0;right: 0;
    p{
      font-size: 0.7rem;
      line-height: 3rem;
      color: #fff;
    }
  }
</style>
