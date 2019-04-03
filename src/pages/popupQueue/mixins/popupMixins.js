import {mapState, mapMutations} from 'vuex';
import _ from '@/plugins/lodash';
import {needPopupQueuePage} from './needPopupQueuePage';

const popupMixins = {
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
        this.pushPagePopupQueueArray({vueName: this.$options.name, toggleName: toggleName});
        this.popupQueueToggleNameArray.push(toggleName);
      } else {
        this[toggleName] = true;
      }
    }
  },
  computed: {
    ...mapState(['pagePopupQueueArray']),
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
    pagePopupQueueArray: {
      handler (val) {
        if (this.isPopupQueuePage && val.length) {
          let first = val[0];
          if (first.vueName === this.$options.name) {
            !this[first.toggleName] && (this[first.toggleName] = true);
          }
        }
      },
      deep: true
    },
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

export {popupMixins};
