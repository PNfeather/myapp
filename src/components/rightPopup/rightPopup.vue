<template>
  <mt-popup id="rightPopup" v-model="showJumpPopup">
    <div class="jumpPopup" :style="{'width': popupWidth + 'rem', 'height': 1.5 * listLen + 'rem'}" >
      <div class="scrollWrapper" ref="jumpPopup">
        <ul class="jumpPopupWrapper">
          <li class="jumpPopupWrapperItem" v-for="(item, index) in popupList" :key="index" @click="dealClick(item)">{{item.text}}</li>
        </ul>
      </div>
    </div>
  </mt-popup>
</template>

<!--头部右侧点击后的气泡框-->

<script>
  import BScroll from 'better-scroll';
    export default {
      name: 'right-popup',
      props: {
        popupWidth: { // 自定义气泡框宽度
          type: Number,
          default: 7
        },
        popupToggle: { // 弹框显隐控制
          type: Boolean,
          default: false
        },
        popupList: { // 数据列表，数组cell: {'text':'', 'fun': () => {}} text文案，fun点击执行方法
          type: Array,
          default: () => {
            return [];
          }
        }
      },
      data () {
        return {
          showJumpPopup: false,
          popupScroll: '',
          listLen: this.popupList.length,
          onceLoadScroll: false
        };
      },
      watch: {
        popupToggle () {
          this.changePopupState();
        },
        showJumpPopup (val) { // 第一次显示弹框后加载betterscroll
          if (!this.onceLoadScroll && val) {
            this.onceLoadScroll = true;
            this.$nextTick(() => {
              this.popupScroll = new BScroll(this.$refs.jumpPopup, {
                scrollY: true,
                eventPassthrough: 'horizontal'
              });
            });
          }
        },
        popupList () {
          this.popupScrollRefresh();
        }
      },
      methods: {
        dealClick (item) {
          if (typeof item.fun != 'function') return console.log('未传入对应执行方式，或传入执行方式不是函数');
          item.fun();
        },
        changePopupState () {
          this.showJumpPopup = !this.showJumpPopup;
        },
        popupScrollRefresh () {
          this.popupScroll && this.popupScroll.refresh();
        }
      },
      mounted () {
      }
    };
</script>

<style lang='less' scoped>
  @import '../../style/common.less';
  #rightPopup{
    top: 2.25rem;
    right: 0;
    left: auto;
    .jumpPopup{
      position: absolute;
      right: .3rem;
      top: .8rem;
      font-size: .7rem;
      max-height: 6rem;
      background-color: #fff;
      border-radius: .3rem;
      &:before{
        .square-top();
        top: -.4rem;
        right: 1rem;
      }
      .scrollWrapper{
        position: relative;
        width: 100%;
        height: 90%;
        margin: 5% 0;
        overflow: hidden;
        .jumpPopupWrapper{
          position: absolute;
          width: 100%;
          .jumpPopupWrapperItem{
            height: 1.5rem;
            line-height: 1.5rem;
            position: relative;
            &:last-child:after{
              display: none;
            }
            &:after{
              .border-bottom(80%, 10%);
            }
          }
        }
      }
    }
  }
</style>
