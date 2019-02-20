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
          <div class="item" @click="jumpTo('inputUserName')">
            <p>当前无用户名，点击跳转输入用户名</p>
          </div>
        </div>
      </section>
      <section class="goExam" v-if="userName !== ''">
        <div class="list">
          <div class="item" @click="jumpTo(item.path)" v-for="(item, index) in indexConfig" :key="index">
            <p>{{item.text}}</p>
          </div>
        </div>
        <div class="loginOut" @click="loginOut">
          切换用户
        </div>
      </section>
    </app-main>
    <right-popup :popupToggle="showJumpPopup" :popupList="jumpPopupList"></right-popup>
  </app-page>
</template>

<script>
  import rightPopup from '@/components/rightPopup/rightPopup.vue';
  import {rightBtnConfig} from './rightBtnConfig';
  // import {mapState} from 'vuex';
  import storageStore from '@/tools/localStorage';
  import _ from '@/plugins/lodash';
  export default {
    name: 'firstPage',
    data () {
      return {
        title: '首页',
        userName: '',
        showJumpPopup: false,
        jumpPopupList: _.cloneDeep(rightBtnConfig),
        justForMe: false,
        indexConfig: [
          {
            text: '点击进入模拟考试',
            path: 'exam'
          }, {
            text: '点击进入模拟分页加载数据页',
            path: 'scrollModel'
          }, {
            text: '点击进入时间组件合图表页',
            path: 'echartsModel'
          }
        ]
      };
    },
    created () {
      this.pageInit();
    },
    mounted () {
    },
    computed: {
    },
    watch: {},
    methods: {
      pageInit () {
        this.userName = storageStore.get.userName();
        if (this.userName === 'yuyuyu') {
          this.justForMe = true;
        }
      },
      openJumpPopup () {
        this.showJumpPopup = !this.showJumpPopup;
      },
      jumpTo (path) {
        this.$router.push(path);
      },
      loginOut () {
        storageStore.set.userName('');
        this.$router.push('inputUserName');
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
        &:first-child{
          border: none;
        }
        border-top: 1px solid #f1f1f1;
        font-size: .8rem;
        line-height: 2rem;
        color: #999;
        padding: 0 0.8rem 0 .4rem;
        text-align: left;
        display: flex;
        align-items: center;
        &:after{
          content: '';
          display: inline-block;
          width: .4rem;
          height: .4rem;
          border-right: 2px solid #999999;
          border-top: 2px solid #999999;
          transform: rotate(45deg);
        }
        p{
          flex: 1;
        }
      }
    }
  }
  .loginOut{
    margin: 2rem auto;
    height: 2rem;
    font-size: .7rem;
    width: 50%;
    border-radius: 0.2rem;
    background-color: aqua;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
