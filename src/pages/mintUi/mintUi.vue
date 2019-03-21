<template>
    <app-page name="mint-ui">
        <app-header :title="title"></app-header>
        <app-main v-model="scrollObj">
          <section class="banner">
            <mt-swipe :auto="0">
              <mt-swipe-item v-for="item in list" :key="item.id">
                <img class="fullImg" :src="item.src" alt="">
              </mt-swipe-item>
            </mt-swipe>
          </section>
        </app-main>
    </app-page>
</template>

<script>
  import {config} from './data';
    export default {
      name: 'mint-ui',
      data () {
        return {
          title: 'mint-ui',
          scrollObj: '',
          list: [...config]
        };
      },
      methods: {},
      components: {},
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    [name="mint-ui"]{
      .banner{
        width: 100%;
        height: 10rem;
        .fullImg{
          width: 100%;
          height: 100%;
        }
      }
    }
</style>
