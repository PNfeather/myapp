<template>
  <app-page id="design-mode">
    <app-header :title="title"></app-header>
    <app-main style="padding-top: .5rem">
      <vue-qr ref="qrImg" :logoSrc="imageUrl" :text="codeValue" :size="300" :whiteMargin="false" :margin="0"></vue-qr>
    </app-main>
  </app-page>
</template>
<script>
  import VueQr from 'vue-qr';
  import defaultImage from '@/assets/image/defaultImage.png';
  export default {
    data () {
      return {
        title: '二维码生成页',
        codeValue: '这是一个二维码',
        imageUrl: defaultImage
      };
    },
    components: {
      VueQr
    },
    computed: {
    },
    watch: {
    }
  };
</script>
