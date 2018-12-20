<template>
  <div class="mode">
    <div class="subTitle">策略模式</div>
    <div class="titleText">测试区域1(一个策略模式运动)</div>
    <div class="testArea1">
      <div class="testEl1" id="testEl1" @click="doMove">戳</div>
      <div class="resetBtn" @click="resetMove">复位</div>
    </div>
    <div class="titleText">测试区域2(一个策略模式验证)</div>
    <div class="testArea2">
      <div class="item">
        <label>用户名</label>
        <span>：</span>
        <input type="text" v-model="userName">
      </div>
      <div class="item">
        <label>密码</label>
        <span>：</span>
        <input type="password" v-model="userPassword">
      </div>
      <div class="item">
        <label>手机</label>
        <span>：</span>
        <input type="text" v-model="userPhone">
      </div>
    </div>
    <div class="submitBtn" @click="validate">验证</div>
  </div>
</template>

<script>
  import Move from '../common/tacticsMode';
  import Validator from '../common/tacticsMode2';
  export default {
    name: 'template-mode',
    data () {
      return {
        userName: '',
        userPassword: '',
        userPhone: '',
        moveEl: null
      };
    },
    methods: {
      doMove () {
        if (this.moveEl) {
          this.moveEl.start('left', 300, 2000, 'strongEaseIn');
          setTimeout(() => {
            this.moveEl.start('top', 100, 2000, 'strongEaseOut');
          }, 2000);
        }
      },
      resetMove () {
        let el = document.getElementById('testEl1');
        el.style.left = 0 + 'px';
        el.style.top = 0 + 'px';
      },
      validate () {
        let validator = new Validator();
        validator.add(this.userName, [{
          strategy: 'isNotEmpty',
          errorMsg: '@用户名'
        }, {
          strategy: 'minLength-4',
          errorMsg: '@用户名'
        }]);
        validator.add(this.userPassword, [{
          strategy: 'isNotEmpty',
          errorMsg: '@密码'
        }, {
          strategy: 'minLength-6',
          errorMsg: '@密码'
        }]);
        validator.add(this.userPhone, [{
          strategy: 'isPhone',
          errorMsg: '@'
        }]);
        let errorMsg = validator.start();
        if (errorMsg) return this.$toast(errorMsg);
        this.$toast('验证通过');
      }
    },
    components: {},
    created () {},
    mounted () {
      this.moveEl = new Move(document.getElementById('testEl1'));
    }
  };
</script>

<style lang='less' scoped>
  @import '~@/style/common.less';
  .subTitle{
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: .85rem;
    margin-top: -.7rem;
  }
  .titleText{
    height: 2.2rem;
    line-height: 2.2rem;
  }
  .testArea1{
    width: 100%;
    height: 10rem;
    position: relative;
    overflow: hidden;
    background: #fff;
    .testEl1{
      height: 3rem;
      width: 3rem;
      border-radius: 3rem;
      background-color: aqua;
      .flexCenter();
      position: absolute;
      left: 0;
      top: 0;
    }
    .resetBtn{
      position: absolute;
      right: 0;
      top: 0;
      width: 2.2rem;
      height: 1.2rem;
      background-color: aqua;
      .flexCenter();
    }
  }
  .testArea2{
    width: 100%;
    .item{
      height: 1.8rem;
      line-height: 1.8rem;
      display: flex;
      background: #fff;
      position: relative;
      padding: 0 .5rem;
      &:last-child:after{
        display: none;
      }
      &:after{
        .border-bottom(100%, 0px, #e7e7e7, 1px);
      }
      label{
        flex: 3rem 0 0;
        .textJustify();
      }
      span{
        flex: 1rem 0 0;
        text-align: right;
      }
      input{
        flex: 1;
      }
    }
  }
  .submitBtn{
    margin: .5rem auto 0;
    width: 4rem;
    height: 1.4rem;
    border: 1px red solid;
    background-color: aqua;
    border-radius: .3rem;
    .flexCenter();
  }
</style>
