<template>
    <app-page name="user">
        <app-header :title="title" :needBack="false"></app-header>
        <app-main v-model="scrollObj">
        </app-main>
      <app-footer></app-footer>
    </app-page>
</template>

<script>
  import appFooter from '@/components/footer/footer.vue';
    export default {
      name: 'user',
      data () {
        return {
            title: '我的',
            scrollObj: ''
        };
      },
      methods: {},
      components: {
        appFooter
      },
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    [name="user"]{

    }
</style>
