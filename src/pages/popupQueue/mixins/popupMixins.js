import {mapState, mapMutations} from 'vuex';
import _ from '@/plugins/lodash';
import {needPopupQueuePage} from './needPopupQueuePage';

const popupMixins = {
  data () {
    return {
      popupQueueToggleNameArray: []
    };
  },
  methods: {
    ...mapMutations(['pushPagePopupQueueArray', 'shiftPagePopupQueueArray']),
    commonPushPopupQueueArray (toggleName) {
      if (needPopupQueuePage.includes(this.$route.path)) {
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
      let obj = {};
      this.popupQueueToggleNameArray.forEach((item) => {
        obj[item] = this[item];
      });
      return obj;
    }
  },
  watch: {
    pagePopupQueueArray: {
      handler (val) {
        if (val.length) {
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
        _.forEach(val, (value, key) => {
          if (!value && oldVal[key]) {
            this.shiftPagePopupQueueArray();
          }
        });
      },
      deep: true
    }
  }
};

export {popupMixins};
