<template>
  <app-page id="test-dom">
    <app-header :title="title"></app-header>
    <popupOne></popupOne>
    <popupTwo></popupTwo>
    <popupThree></popupThree>
  </app-page>
</template>

<script>
  import popupOne from './compunents/popupOne';
  import popupTwo from './compunents/popupTwo';
  import popupThree from './compunents/popupThree';
  import {queueWatchMixins} from './mixins/queueWatchMixins';
  export default {
    name: 'test-dom',
    mixins: [queueWatchMixins],
    data () {
      return {
        title: '队列弹框'
      };
    },
    methods: {
    },
    components: {
      popupOne,
      popupTwo,
      popupThree
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
