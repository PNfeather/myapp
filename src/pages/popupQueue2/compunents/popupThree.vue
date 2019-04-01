<template>
  <div>
    <mt-popup v-model="popupToggle3">
      <div class="popup3">弹框3</div>
    </mt-popup>
    <mt-popup v-model="popupToggle4">
      <div class="popup4">弹框4</div>
    </mt-popup>
  </div>
</template>

<script>
  import {popupMixins} from '../mixins/popupMixins';
  export default {
    name: 'popup-three',
    mixins: [popupMixins],
    data () {
      return {
        popupToggle3: false,
        popupToggle4: false
      };
    },
    methods: {},
    components: {},
    created () {},
    mounted () {
      setTimeout(() => {
        this.pushTestPagePopup({vueName: this.$options.name, toggleName: 'popupToggle3'});
        this.pushTestPagePopup({vueName: this.$options.name, toggleName: 'popupToggle4'});
      }, 100);
    },
    watch: {
      popupToggle3 (val) {
        if (!val) this.shiftTestPagePopup();
      },
      popupToggle4 (val) {
        if (!val) this.shiftTestPagePopup();
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
    .popup4{
      width: 24rem;
      height: 25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rebeccapurple;
    }
</style>
