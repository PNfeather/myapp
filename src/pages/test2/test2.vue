<template>
  <div class="firstPage">
    <mt-header :title="`你好`"></mt-header>
    <p  @click="jumpHome">{{ msg }}</p>
    <p v-text="getSum()"></p>
    <div class="imageWrapper" v-for="(item, index) in imgList" :key="index">
      <img class="image" v-lazy="item" v-img-deal="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'test2',
  data () {
    return {
      msg: 'test2Page',
      imgList: [
        'https://imgsa.baidu.com/exp/w=480/sign=ccfcf0f28c35e5dd902ca4d746c7a7f5/b03533fa828ba61e2bedd88f4834970a304e590a.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542718652331&di=3d61ab43d0f2afc10a52d4f851ab46d3&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FC%2FC2%2FC212F0DF5C3067A73362C5F7D496E19D.jpg',
        'https://imgsa.baidu.com/exp/w=480/s3533fa828ba61e2bedd88f4834970a304e590a.jpg'
      ]
    };
  },
  directives: {
    imgDeal: {
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
  methods: {
    jumpHome () {
      this.$router.push({'path': '/test3'});
    },
    getSum () {
      return this.$store.getters.sumState(2);
    }
  }
};
</script>
<style lang="less" scoped>
  .imageWrapper{
    margin: 1rem;
    width: 10rem;
    height: 6rem;
    overflow: hidden;
    position: relative;
    .image{
      position: absolute;
      top: 0;left: 0;
    }
  }
</style>
