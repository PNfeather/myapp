<template>
    <app-page id="test-dom">
      <app-header :title="title"></app-header>
      <!--<popupOne></popupOne>-->
      <!--<popupTwo></popupTwo>-->
      <!--<popupThree></popupThree>-->
    </app-page>
</template>

<script>
  import {mapMutations} from 'vuex';
  import popupOne from './compunents/popupOne';
  import popupTwo from './compunents/popupTwo';
  import popupThree from './compunents/popupThree';
  import formatNum from './common/formatNum';
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
        },
        test1 () {
          let a = 1;
          this.test2().then((res) => {
            if (res) {
              console.log(a);
            }
          });
        },
        test2 () {
          return this.$messagebox.confirm('', {
            title: '温馨提示',
            message: '测试'
          }).then(() => {
            return Promise.resolve(true);
          }).catch(() => {
            return Promise.resolve(false);
          });
        },
        sort (arr) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[i] > arr[j]) {
                let tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
              }
            }
          }
          return arr;
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
        console.log(this.sort([1, 3, 2, 8, 9]));
        // this.test1();
        console.log(formatNum('12312312312'));
        console.log(this.$route);
      }
    };
</script>

<style lang='less' scoped>
    #test-dom{
    }
</style>
