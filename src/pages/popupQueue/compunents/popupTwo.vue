<template>
  <mt-popup v-model="popupToggle2">
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
        popupToggle2: false
      };
    },
    methods: {},
    components: {},
    created () {},
    mounted () {
      setTimeout(() => {
        this.pushTestPagePopup(this.$options.name);
      }, 600);
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
