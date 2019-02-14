<template>
  <app-page>
    <app-header :title="title" :needBack="false">
      <div slot="header-right" @click="openJumpPopup" v-if="justForMe">
        <i class="iconfont icon-tiaozhuan"></i>
      </div>
    </app-header>
    <app-main>
      <section class="noName" v-if="userName === ''">
        <div class="list">
          <div class="item" @click="goInputUserName">
            <p>当前无用户名，点击跳转输入用户名</p>
            <span class="rightIcon"></span>
          </div>
        </div>
      </section>
      <section class="goExam" v-if="userName !== ''">
        <div class="list">
          <div class="item" @click="goExam">
            <p>点击进入模拟考试</p>
            <span class="rightIcon"></span>
          </div>
        </div>
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
    .list{
      margin-top: .5rem;
      background: #fff;
      .item{
        font-size: .8rem;
        line-height: 2rem;
        color: #999;
        padding: 0 .4rem;
        text-align: left;
        display: flex;
        align-items: center;
        p{
          flex: 1;
        }
        .rightIcon{
          display: inline-block;
          width: .4rem;
          height: .4rem;
          border-right: 2px solid #999999;
          border-top: 2px solid #999999;
          transform: rotate(45deg);
        }
      }
    }
  }
</style>
