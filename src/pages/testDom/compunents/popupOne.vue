<template>
  <mt-popup v-model="popupToggle">
    <div class="popup1" @click="close()">弹框1</div>
  </mt-popup>
</template>

<script>
  import {popupMixins} from '../mixins/popupMixins';
    export default {
      name: 'popup-one',
      mixins: [popupMixins],
      data () {
        return {
          popupToggle: false
        };
      },
      methods: {
      },
      components: {},
      created () {},
      mounted () {
        setTimeout(() => {
          console.log();
          this.pushTestPagePopup('popup1');
        }, 300);
      },
      watch: {
        testPagePopup: {
          handler (val) {
            if (val[0] === 'popup1') {
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
      .popup1{
        width: 10rem;
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
      }
</style>
