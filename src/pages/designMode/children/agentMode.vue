<template>
  <div class="mode">
    <div class="subTitle">代理模式</div>
    <div class="explain">缓存代理模拟，主要用于后端接口数据缓存</div>
    <div class="item">
      <label>待计算数据</label>
      <span>：</span>
      <input type="text" placeholder="用英文逗号隔开输入需计算数据" v-model="val">
    </div>
    <div class="btnGroup">
      <div class="btnItem">
        <div class="btn" @click="mult">计算乘积</div>
      </div>
      <div class="btnItem">
        <div class="btn" @click="plus">计算加和</div>
      </div>
    </div>
    <div class="result">
      <span>计算结果:</span><span>{{result}}</span>
    </div>
  </div>
</template>

<script>
  import proxyFactory from '../common/agentMode';
  export default {
    name: 'agent-mode',
    data () {
      return {
        val: '',
        result: '',
        cache: {}
      };
    },
    methods: {
      multMethod () {
        let a = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
          a = a * Math.floor(arguments[i]);
        }
        this.$toast('第一次需要计算,之后同值计算从代理缓存中取值');
        return a;
      },
      plusMethod () {
        let a = 0;
        for (let i = 0, l = arguments.length; i < l; i++) {
          a = a + Math.floor(arguments[i]);
        }
        this.$toast('第一次需要计算,之后同值计算从代理缓存中取值');
        return a;
      },
      mult () {
        this.result = this.cache.mult(...this.args);
      },
      plus () {
        this.result = this.cache.plus(...this.args);
      }
    },
    computed: {
      args () {
        return this.val.split(',');
      }
    },
    mounted () {
      this.cache.mult = proxyFactory(this.multMethod);
      this.cache.plus = proxyFactory(this.plusMethod);
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
  .item{
    height: 1.8rem;
    line-height: 1.8rem;
    display: flex;
    background: #fff;
    position: relative;
    padding: 0 .5rem;
    label{
      flex: 4.2rem 0 0;
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
  .btnGroup{
    margin: .5rem 0;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    width: 100%;
    display: flex;
    .btnItem{
      flex: 1;
      .flexCenter();
      .btn{
        height: 90%;
        width: 80%;
        border-radius: .2rem;
        background-color: #597ED9;
        border: 1px solid red;
        .flexCenter();
      }
    }
  }
  .result,.explain{
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: left;
    padding-left: .5rem;
  }
</style>
