<template>
    <app-page>
        <app-header :title="title"></app-header>
        <app-main v-model="scrollObj">

        </app-main>
    </app-page>
</template>

<script>
    export default {
      name: 'test-dom',
      data () {
        return {
            title: 'DOM测试页',
            scrollObj: ''
        };
      },
      methods: {},
      components: {},
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    #test-dom{

    }
</style>
