<template>
  <app-page id="design-mode">
    <app-header :title="title"></app-header>
    <app-main style="padding-top: .5rem">
      <div style="width: 10rem; height: 10rem; margin: 0 auto;">
        <qrImg></qrImg>
      </div>
    </app-main>
  </app-page>
</template>
<script>
  import qrImg from '@/components/qrImg/qrImg.vue';
  export default {
    data () {
      return {
        title: '二维码生成页'
      };
    },
    components: {
      qrImg
    }
  };
</script>
