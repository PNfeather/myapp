<template>
  <mt-popup v-model="popupToggle">
    <div class="popup2">弹框2</div>
  </mt-popup>
</template>

<script>
  import {popupMixins} from '../mixins/popupMixins';
  export default {
    name: 'popup-two',
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
        this.pushTestPagePopup('popup2');
      }, 600);
    },
    watch: {
      testPagePopup: {
        handler (val) {
          if (val[0] === 'popup2') {
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
    .popup2{
      width: 15rem;
      height: 15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: yellow;
    }
</style>
