<template>
  <app-page id='popup-queue2'>
    <app-header :title='title'></app-header>
    <popupOne></popupOne>
    <popupTwo></popupTwo>
    <popupThree></popupThree>
  </app-page>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {changeTargetAttr} from './common';
  import popupOne from './compunents/popupOne';
  import popupTwo from './compunents/popupTwo';
  import popupThree from './compunents/popupThree';
  export default {
    name: 'popup-queue2',
    data () {
      return {
        title: '队列弹框'
      };
    },
    methods: {
      ...mapMutations(['clearTestPagePopup'])
    },
    computed: {
      ...mapState(['testPagePopup'])
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
    },
    watch: {
      testPagePopup: {
        handler (val) {
          if (val.length) {
            let first = val[0];
            changeTargetAttr(this, first.vueName, first.toggleName, true);
          }
        },
        deep: true
      }
    }
  };
</script>

<style lang='less' scoped>
  #popup-queue2{
  }
</style>
