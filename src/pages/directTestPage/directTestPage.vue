<template>
    <app-page>
        <app-header :title="title"></app-header>
        <main></main>
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
      methods: {},
      components: {},
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>

</style>
