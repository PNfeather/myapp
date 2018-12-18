<template>
    <app-page>
        <app-header :title="title"></app-header>
        <app-main v-model="scrollObj">

        </app-main>
    </app-page>
</template>

<script>
    export default {
      name: 'design-mode',
      props: {
        key: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
            title: '设计模式',
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
    #design-mode{

    }
</style>
