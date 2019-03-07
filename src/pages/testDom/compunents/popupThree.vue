<template>
  <mt-popup v-model="popupToggle">
    <div class="popup3">弹框3</div>
  </mt-popup>
</template>

<script>
  import {popupMixins} from '../mixins/popupMixins';
  export default {
    name: 'popup-three',
    mixins: [popupMixins],
    data () {
      return {
        popupToggle: false
      };
    },
    methods: {},
    components: {},
    created () {},
    mounted () {
      setTimeout(() => {
        this.pushTestPagePopup('popup3');
      }, 900);
    },
    watch: {
      testPagePopup: {
        handler (val) {
          if (val[0] === 'popup3') {
            this.popupToggle = true;
          }
        },
        deep: true
      },
      popupToggle (val) {
        if (!val) {
          this.shiftTestPagePopup();
        }
      }
    }
  };
</script>

<style lang='less' scoped>
    .popup3{
      width: 24rem;
      height: 24rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #26a2ff;
    }
</style>
