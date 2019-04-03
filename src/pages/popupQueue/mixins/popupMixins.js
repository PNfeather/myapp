import {mapState, mapMutations} from 'vuex';
import _ from '@/plugins/lodash';

let popupConfig = {
  'popup-one': 'popupToggle1',
  'popup-two': 'popupToggle2',
  'popup-three': ['popupToggle3', 'popupToggle4']
};

const popupMixins = {
  data () {
    return {
    };
  },
  methods: {
    ...mapMutations(['pushTestPagePopup', 'shiftTestPagePopup'])
  },
  computed: {
    ...mapState(['testPagePopup']),
    currentVueToggle () {
      let currentToggle = popupConfig[this.$options.name];
      if (typeof currentToggle === 'string') {
        return this[popupConfig[this.$options.name]];
      } else {
        let obj = {};
        currentToggle.forEach((item) => {
          obj[item] = this[item];
        });
        return obj;
      }
    }
  },
  watch: {
    testPagePopup: {
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
    currentVueToggle: {
      handler (val, oldVal) {
        if (typeof val === 'boolean') {
          if (!val) {
            this.shiftTestPagePopup();
          }
        } else {
          _.forEach(val, (value, key) => {
            if (!value && oldVal[key]) {
              this.shiftTestPagePopup();
            }
          });
        }
      },
      deep: true
    }
  }
};

export {popupMixins};
