<template>
    <footer name="appFooter">
      <div class="item" v-for="(item, index) in footerList" :key="index" @click="jumpTo(item.path)">
        <i class="iconfont" :class="[item.icon, {'active': item.path === activePath}]"></i>
        <p class="text" :class="{'active': item.path === activePath}">{{item.text}}</p>
      </div>
    </footer>
</template>

<script>
    export default {
      name: 'app-footer',
      data () {
        return {
          activePath: '',
          footerList: [
            {
              text: '首页',
              icon: 'icon-firstPage',
              path: '/'
            }, {
              text: '我的',
              icon: 'icon-mine',
              path: '/user'
            }
          ]
        };
      },
      methods: {
        jumpTo (path) {
          this.$router.push(path);
        },
        changeActive () {
          let currentPath = this.$route.path;
          this.footerList.forEach((item) => {
            (currentPath === item.path) && (this.activePath = item.path);
          });
        }
      },
      components: {},
      created () {
        this.changeActive();
      },
      mounted () {
      }
    };
</script>

<style lang='less' scoped>
  @import '~@/style/common.less';
    [name="appFooter"]{
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      height: 2.8rem;
      background: #fff;
      &:after{
        .border-top();
      }
      .item{
        flex: 1;
        .iconfont{
          display: inline-block;
          font-size: 1.2rem;
          margin: .2rem 0;
        }
        .text{
          font-size: .6rem;
        }
        .active{
          color: #597ED9;
        }
      }
    }
</style>
