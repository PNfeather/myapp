<template>
  <section>
    <vue-qr v-show="!withoutInternet" ref="qrImg" :logoSrc="imageUrl" :text="codeValue" :size="imgSize" :whiteMargin="false" :margin="0"></vue-qr>
    <img v-show="withoutInternet" :src="imageUrl" alt="" :style="{'height': imgSize + 'px', 'width': imgSize + 'px'}">
  </section>
</template>

<script type='text/babel'>
  import VueQr from 'vue-qr';
  import defaultImage from '@/assets/image/defaultImage.png';
  import noInternet from '@/assets/image/withoutInternet.png';
  export default {
    name: '',
    // props: {
    //   key: {
    //     type: String,
    //     default: ''
    //   }
    // },
    data () {
      return {
        imageUrl: defaultImage,
        codeValue: '',
        withoutInternet: true,
        imgSize: 5
      };
    },
    mounted () {
      this.getImgSize();
      this.getQrContent();
    },
    components: {
      VueQr
    },
    methods: {
      getImgSize () {
        this.$nextTick(() => {
          let parentEl = this.$el.parentNode;
          this.imgSize = parentEl.clientWidth;
        });
      },
      getQrContent () {
        this.$http.get('/getQrContent', {data: {'type': 1}}).then((res) => {
          let data = res.data;
          if (data.resultCode === '000000') {
            let resultData = data.resultData;
            this.codeValue = resultData.text;
            this.withoutInternet = false;
          } else {
            this.imageUrl = noInternet;
            this.withoutInternet = true;
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  [name = '']{}
</style>
