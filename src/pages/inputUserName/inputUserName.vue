<template>
    <app-page id="input-user-name">
        <app-header :title="title" :needBack="false"></app-header>
        <app-main v-model="scrollObj">
          <section>
            <div class="inputDiv">
              <span>请输入用户名：</span>
              <input type="text" maxlength="11" name="userName" v-model="userName">
            </div>
            <div class="inputDiv">
              <span>请输入密码：</span>
              <input type="passWord" maxlength="12" name="passWord" v-model="passWord">
            </div>
            <div class="btnSure" @click="submit">提交</div>
          </section>
        </app-main>
    </app-page>
</template>

<script>
  import {mapMutations} from 'vuex';
  import Validator from '@/pages/designMode/common/tacticsMode2';
    export default {
      name: 'input-user-name',
      data () {
        return {
          title: '输入用户名',
          scrollObj: '',
          userName: '',
          passWord: ''
        };
      },
      methods: {
        ...mapMutations(['changeUserName']),
        validate () {
          let validator = new Validator();
          validator.add(this.userName, [{
            strategy: 'isNotEmpty',
            errorMsg: '@用户名'
          }, {
            strategy: 'minLength-4',
            errorMsg: '@用户名'
          }]);
          validator.add(this.passWord, [{
            strategy: 'isNotEmpty',
            errorMsg: '@密码'
          }, {
            strategy: 'minLength-6',
            errorMsg: '@密码'
          }]);
          let errorMsg = validator.start();
          if (errorMsg) {
            this.$toast(errorMsg);
            return false;
          } else {
            return true;
          }
        },
        submit () {
          if (this.validate()) {
            this.changeUserName(this.userName);
            this.$router.go(-1);
          }
        }
      },
      components: {},
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    #input-user-name{
      .inputDiv{
        &:first-child{
          margin-top: 1rem;
        }
        width: 100%;
        height: 2.2rem;
        line-height: 1.8rem;
        display: flex;
        padding: .2rem 2rem;
        span{
          display: inline-block;
          width: 6rem;
          text-align: justify;
          &:after{
            content: '';
            display: inline-block;
            width: 100%;
            height: 0;
          }
        }
        input{
          flex: 1;
          text-align: center;
        }
      }
      .btnSure{
        height: 2rem;
        width: 80%;
        border-radius: 0.2rem;
        background-color: aqua;
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem auto;
      }
    }
</style>
