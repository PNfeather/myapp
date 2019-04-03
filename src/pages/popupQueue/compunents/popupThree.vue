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
  import {queuePushShiftMixins} from '../mixins/queuePushShiftMixins';
  export default {
    name: 'popup-three',
    mixins: [queuePushShiftMixins],
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
        this.commonPushPopupQueueArray('popupToggle3');
        this.commonPushPopupQueueArray('popupToggle4');
      }, 100);
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
