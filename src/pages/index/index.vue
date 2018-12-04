<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="openJumpPopup">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <app-main>
    </app-main>
    <right-popup :popupToggle="showJumpPopup" :popupList="jumpPopupList"></right-popup>
  </app-page>
</template>

<script>
  import rightPopup from '@/components/rightPopup/rightPopup.vue';
  import {rightBtnConfig} from './rightBtnConfig';
  import _ from '@/plugins/lodash';
  export default {
    name: 'firstPage',
    data () {
      return {
        title: '首页',
        showJumpPopup: false,
        jumpPopupList: _.cloneDeep(rightBtnConfig)
      };
    },
    mounted () {
    },
    watch: {},
    methods: {
      openJumpPopup () {
        this.showJumpPopup = !this.showJumpPopup;
      }
    },
    components: {
      rightPopup
    }
  };
</script>
<style scoped lang="less">
  .icon-tiaozhuan{
    color: #5CD4FE;
    font-size: 1rem;
  }
</style>
