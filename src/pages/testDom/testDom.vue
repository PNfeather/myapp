<template>
    <app-page id="test-dom">
      <app-header :title="title"></app-header>
      <popupOne></popupOne>
      <popupTwo></popupTwo>
      <popupThree></popupThree>
    </app-page>
</template>

<script>
  import {mapMutations} from 'vuex';
  import popupOne from './compunents/popupOne';
  import popupTwo from './compunents/popupTwo';
  import popupThree from './compunents/popupThree';
    export default {
      name: 'test-dom',
      data () {
        return {
          title: 'testDom'
        };
      },
      methods: {
        ...mapMutations(['clearTestPagePopup']),
        test () { // 测试重复调接口会拦截
          this.$http.get('/test').then((res) => {
            console.log(res);
          });
          this.$http.get('/test', {
            data: {
              test: 0
            }
          }).then((res) => {
            console.log(res);
          });
        }
      },
      beforeRouteLeave (to, from, next) {
        this.clearTestPagePopup();
        next();
      },
      components: {
        popupOne,
        popupTwo,
        popupThree
      },
      created () {
        // this.test();
      },
      mounted () {
      }
    };
</script>

<style lang='less' scoped>
    #test-dom{
    }
</style>
