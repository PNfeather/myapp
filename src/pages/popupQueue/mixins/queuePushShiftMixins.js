import {mapMutations} from 'vuex';
import _ from '@/plugins/lodash';
import {needPopupQueuePage} from './needPopupQueuePage';

const queuePushShiftMixins = {
  data () {
    return {
      isPopupQueuePage: needPopupQueuePage.includes(this.$route.path),
      popupQueueToggleNameArray: []
    };
  },
  methods: {
    ...mapMutations(['pushPagePopupQueueArray', 'shiftPagePopupQueueArray']),
    commonPushPopupQueueArray (toggleName) {
      if (this.isPopupQueuePage) {
        this.pushPagePopupQueueArray(() => {
          this[toggleName] = true;
        });
        this.popupQueueToggleNameArray.push(toggleName);
      } else {
        this[toggleName] = true;
      }
    }
  },
  computed: {
    popupQueueToggleObject () {
      if (this.isPopupQueuePage) {
        let obj = {};
        this.popupQueueToggleNameArray.forEach((item) => {
          obj[item] = this[item];
        });
        return obj;
      }
    }
  },
  watch: {
    popupQueueToggleObject: {
      handler (val, oldVal) {
        if (this.isPopupQueuePage) {
          _.forEach(val, (value, key) => {
            if (!value && oldVal[key]) {
              this.shiftPagePopupQueueArray();
            }
          });
        }
      },
      deep: true
    }
  }
};

export {queuePushShiftMixins};
