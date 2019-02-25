<template>
  <div class="mode">
    <div class="subTitle">单列模式</div>
    <div class="btnGroup">
      <div class="btnItem">
        <div class="btn" @click="test">给右边的绑定事件</div>
      </div>
      <div class="btnItem">
        <div class="btn" ref="btn">点击按钮</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getSingle} from '../common/singleRowMode';
  export default {
      name: 'single-row-mode',
      data () {
        return {
          bindEvent: getSingle(() => { // 函数内代码只会执行一次，之后执行return部分，当前执行return true
            this.$toast('绑定事件已生效');
            this.$refs.btn.onclick = () => {
              this.$toast('绑定了事件了，再点击左边按钮不执行绑定了');
            };
            return true;
          })
        };
      },
      methods: {
        test () {
          this.bindEvent();
        }
      },
      components: {},
      created () {},
      mounted () {}
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
  .btnGroup{
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
</style>
