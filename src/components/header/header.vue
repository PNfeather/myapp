<template>
  <mt-header class="app-mint-header" :title="title" fixed>
    <div slot="left" v-if="needBack">
      <div class="backBtn" @click="back">
        <span class="backIcon"></span>返回
      </div>
    </div>
    <div slot="left" v-if="!needBack">
      <slot name="header-left"></slot>
    </div>
    <div slot="right">
      <slot name="header-right"></slot>
    </div>
  </mt-header>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    needBack: { // 是否显示返回按钮
      type: Boolean,
      default: true
    },
    needCustomBack: { // 是否需要自定义返回按钮点击方法
      type: Boolean,
      default: false
    },
    backParams: { // 带返回参数则返回指定路由
      type: Object,
      default: null
    },
    backUrl: { // 带返回路径，直接跳路径
      type: String,
      default: ''
    },
    backNum: { // 往前返回指定页数
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    };
  },
  methods: {
    back () { // 点击返回执行方法
      if (this.needCustomBack) {
        return this.$emit('customBack');
      }
      if (this.backParams) {
        this.$router.push(this.backParams);
      } else if (this.backUrl) {
        location.href = this.backUrl;
      } else {
        this.$router.go(-this.backNum);
      }
    }
  },
  components: {},
  created () {},
  mounted () {}
};
</script>

<style lang='less' scoped>
  @import '../../style/common.less';
  .app-mint-header{
    height: 2.25rem;
    line-height: 2.25rem;
    background-color: #fff;
    color: #333;
    font-size: 0.7rem;
    &:after{
      .border-bottom();
    }
  }
  .backBtn{
    color: #5CD4FE;
    .backIcon{
      display: inline-block;
      width: .7rem;height: .7rem;
      border-top: 2px solid #5CD4FE;
      border-left: 2px solid #5CD4FE;
      margin-left: .4rem;
      transform: rotate(-45deg);
    }
  }
</style>
