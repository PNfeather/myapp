<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="openJumpPopup" v-if="justForMe">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <app-main>
      <section class="noName" v-if="userName === ''" @click="goInputUserName">
        <div>当前无用户名，点击跳转输入用户名</div>
      </section>
      <section class="goExam" v-if="userName !== ''" @click="goExam">
        <div>点击进入模拟考试</div>
      </section>
    </app-main>
    <right-popup :popupToggle="showJumpPopup" :popupList="jumpPopupList"></right-popup>
  </app-page>
</template>

<script>
  import rightPopup from '@/components/rightPopup/rightPopup.vue';
  import {rightBtnConfig} from './rightBtnConfig';
  import {mapState} from 'vuex';
  import _ from '@/plugins/lodash';
  export default {
    name: 'firstPage',
    data () {
      return {
        title: '首页',
        showJumpPopup: false,
        jumpPopupList: _.cloneDeep(rightBtnConfig),
        justForMe: false
      };
    },
    created () {
      if (this.userName === 'yuyuyu') {
        this.justForMe = true;
      }
    },
    mounted () {
    },
    computed: {
      ...mapState(['userName'])
    },
    watch: {},
    methods: {
      openJumpPopup () {
        this.showJumpPopup = !this.showJumpPopup;
      },
      goInputUserName () {
        this.$router.push('inputUserName');
      },
      goExam () {
        this.$router.push('exam');
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
  .noName, .goExam{
    font-size: .8rem;
    line-height: 2rem;
    text-decoration: underline;
    color: #999;
  }
</style>
