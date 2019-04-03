import {mapState} from 'vuex';

const queueWatchMixins = {
  data () {
    return {
    };
  },
  computed: {
    ...mapState(['pagePopupQueueArray'])
  },
  watch: {
    'pagePopupQueueArray.length' (val, oldVal) { // 队列长度监听，第一次增添队列或者队列长度减少时，执行队列列首方法
       if (val && (!oldVal || (oldVal > val))) {
         this.pagePopupQueueArray[0]();
       }
    }
  }
};

export {queueWatchMixins};
