<template>
  <mt-popup v-model="popupToggle2">
    <div class="popup2">弹框2</div>
  </mt-popup>
</template>

<script>
  import {queuePushShiftMixins} from '../mixins/queuePushShiftMixins';
  export default {
    name: 'popup-two',
    mixins: [queuePushShiftMixins],
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
        this.commonPushPopupQueueArray('popupToggle2');
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
