<template>
  <mt-popup v-model="popupToggle3">
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
        popupToggle3: false
      };
    },
    methods: {},
    components: {},
    created () {},
    mounted () {
      setTimeout(() => {
        this.pushTestPagePopup(this.$options.name);
      }, 900);
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
