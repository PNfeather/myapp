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
        title: '队列弹框'
      };
    },
    methods: {
      ...mapMutations(['clearTestPagePopup'])
    },
    components: {
      popupOne,
      popupTwo,
      popupThree
    },
    beforeRouteLeave (to, from, next) {
      this.clearTestPagePopup();
      next();
    },
    created () {
    },
    mounted () {
    }
  };
</script>

<style lang='less' scoped>
  #test-dom{
  }
</style>
