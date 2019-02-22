<template>
    <app-page id="test-dom">
        <app-header :title="title"></app-header>
    </app-page>
</template>

<script>
    export default {
      name: 'test-dom',
      data () {
        return {
          title: 'testDom'
        };
      },
      methods: {
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
      components: {
      },
      created () {
        this.test();
      },
      mounted () {
      }
    };
</script>

<style lang='less' scoped>
    #test-dom{
    }
</style>
