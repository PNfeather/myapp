<template>
    <app-page>
        <app-header :title="title"></app-header>
        <main>
          <div @click="goTest2">返回test2</div>
        </main>
    </app-page>
</template>

<script>
    export default {
      name: 'direct-test-page',
      props: {
        key: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
            title: '指令测试页面'
        };
      },
      methods: {
        goTest2 () {
          this.$router.go('test3');
        }
      },
      components: {},
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>

</style>
