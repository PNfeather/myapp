<template>
  <mt-popup v-model="popupToggle1">
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
          popupToggle1: false
        };
      },
      methods: {
      },
      components: {},
      created () {},
      mounted () {
        setTimeout(() => {
          this.pushTestPagePopup({vueName: this.$options.name, toggleName: 'popupToggle1'});
        }, 300);
      },
      watch: {
        popupToggle1 (val) {
          if (!val) this.shiftTestPagePopup();
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
