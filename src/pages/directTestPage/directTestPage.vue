<template>
  <app-page>
    <app-header :title="title"></app-header>
    <app-main class="main">
      <section>
        <div class="title">外部点击指令测试区域:</div>
        <div class="btn" @click.stop="clickContentShow">点击显示隐藏内容</div>
        <div class="text bgRed" v-show="clickContentToggle" v-clickOutside="clickContentHide">点击显示的</div>
      </section>
      <section>
        <div class="title">长按指令测试区域:</div>
        <div class="btn" v-longTouch="longTouchContentShow">长按显示隐藏内容</div>
        <div class="text bgYellow" @click="longTouchContentToggle = false" v-show="longTouchContentToggle">长按显示的</div>
      </section>
      <section>
        <div class="title">时间指令测试区域:</div>
        <div class="text" v-time="timeNow"></div>
        <div class="text" v-time="timeToday"></div>
        <div class="text" v-time="timeNowYear"></div>
      </section>
      <section>
        <div class="title">滑动点击指令测试区域:</div>
        <div v-for="item in [1, 2, 3, 4]" :key="item">
          <mt-cell-swipe ref="swipeElswipeContentement" :right="swipeRight">
            <div class="swipeContent" v-swipeClick="swipeClick(item)">
              内容{{item}}
              <span @touchend.stop="clickSwipeChild(item)"></span>
            </div>
          </mt-cell-swipe>
        </div>
      </section>
      <section>
        <div class="title">图片懒加载及错误图片测试区域:</div>
        <div class="imageWrapper" v-for="(item, index) in imgList" :key="index">
          <img class="image" v-lazy="item" v-imgDeal="item" alt="">
        </div>
      </section>
    </app-main>
    <div class="dragElement" v-dragElement @click="clickDragEl">这是拖拽指令测试元素</div>
  </app-page>
</template>

<script>
  import {commonTime} from '@/tools/common';
  export default {
    name: 'direct-test-page',
    data () {
      return {
        title: '指令测试页',
        clickContentToggle: false,
        longTouchContentToggle: false,
        timeNow: commonTime.getUnix(),
        timeToday: commonTime.getTodayUnix(),
        timeNowYear: commonTime.getYearUnix(),
        swipeRight: [
          {
            content: '删除',
            style: {background: 'red', color: '#fff'},
            handler: () => { this.$messagebox('delete'); }
          }
        ],
        imgList: [
          'https://imgsa.baidu.com/exp/w=480/sign=ccfcf0f28c35e5dd902ca4d746c7a7f5/b03533fa828ba61e2bedd88f4834970a304e590a.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542718652331&di=3d61ab43d0f2afc10a52d4f851ab46d3&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FC%2FC2%2FC212F0DF5C3067A73362C5F7D496E19D.jpg',
          'https://imgsa.baidu.com/exp/w=480/s3533fa828ba61e2bedd88f4834970a304e590a.jpg'
        ]
      };
    },
    methods: {
      clickContentShow () {
        this.clickContentToggle = !this.clickContentToggle;
      },
      clickContentHide () {
        this.clickContentToggle = false;
      },
      longTouchContentShow () {
        this.longTouchContentToggle = !this.longTouchContentToggle;
      },
      clickDragEl () {
        console.log('点击了拖拽元素');
      },
      swipeClick (val) {
        return () => {
          console.log('参数为' + val);
        };
      },
      clickSwipeChild (val) {
        console.log('点击了第' + val + '块的子元素');
      }
    },
    directives: {
      time: { // 时间显示指定
        bind: function (el, binding) {
          el.innerHTML = commonTime.getFormatTime(binding.value);
          el.__timeout__ = setInterval(() => {
            el.innerHTML = commonTime.getFormatTime(binding.value);
          }, 60000);
        },
        unbind: function (el) {
          clearInterval(el.__timeout__);
          delete el.__timeout__;
        }
      },
      swipeClick: { // 集成点击与滑动事件指令
        bind: function (el, binding) {
          let handler = binding.value;
          let startX;
          let startY;
          let displacementX;
          let displacementY;
          el.addEventListener('touchstart', (event) => {
            let touch = event.touches[0];
            startX = parseInt(touch.pageX);
            startY = parseInt(touch.pageY);
            displacementX = 0;
            displacementY = 0;
          });
          el.addEventListener('touchmove', (event) => {
            event.preventDefault();
            let touch = event.touches[0];
            let movePageX = parseInt(touch.pageX);
            let movePageY = parseInt(touch.pageY);
            displacementX = Math.abs(movePageX - startX);
            displacementY = Math.abs(movePageY - startY);
          });
          el.addEventListener('touchend', () => {
            if (displacementX < 10 && displacementY < 10) {
              handler();
            }
          });
        }
      },
      imgDeal: { // 图片处理指令
        inserted: function (el, binding) {
          let wrapper = el.parentNode;
          let src = binding.value;
          let img = new Image();
          img.src = src;
          img.onerror = () => {
            el.onload = () => {
              el.style.width = '100%';
              el.style.height = '100%';
              el.src = require('@/assets/logo.png');
            };
          };
          img.onload = () => {
            if (img.width && img.height) {
              if ((img.width / img.height) > (wrapper.offsetWidth / wrapper.offsetHeight)) {
                el.style.height = '100%';
                el.style.width = 'auto';
                el.style.left = '50%';
                el.style.transform = 'translateX(-50%)';
              } else {
                el.style.width = '100%';
                el.style.height = 'auto';
                el.style.top = '50%';
                el.style.transform = 'translateY(-50%)';
              }
            }
          };
        }
      }
    },
    components: {}
  };
</script>

<style lang='less' scoped>
  @import "../../style/common";
  .main {
    section {
      background-color: #fff;
      margin-top: .5rem;
      .title {
        padding: 0 1rem;
        font-size: .7rem;
        height: 1.4rem;
        line-height: 1.4rem;
        text-align: left;
      }
      .btn, .text {
        font-size: .6rem;
        height: 1.4rem;
        line-height: 1.4rem;
      }
      .bgRed {
        background-color: red;
        color: #fff;
      }
      .bgYellow {
        background-color: yellow;
        color: #fff;
      }
      .swipeContent{
        width: 100%;
        height: 2.4rem;
        line-height: 2.4rem;
        &:after{
          .border-bottom();
        }
        span{
          vertical-align: middle;
          height: 1rem;
          width: 2rem;
          display: inline-block;
          background-color: red;
        }
      }
      .imageWrapper{
        margin: 1rem auto;
        width: 10rem;
        height: 6rem;
        overflow: hidden;
        position: relative;
        .image{
          position: absolute;
          top: 0;left: 0;
        }
      }
    }
  }
  .dragElement {
    width: 3rem;
    height: 3rem;
    font-size: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    background: #597ED9;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 9999999;
  }
</style>
