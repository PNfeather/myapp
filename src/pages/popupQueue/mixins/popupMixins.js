import {mapState, mapMutations} from 'vuex';

let popupConfig = {
  'popup-one': 'popupToggle1',
  'popup-two': 'popupToggle2',
  'popup-three': 'popupToggle3'
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
      return this[popupConfig[this.$options.name]];
    }
  },
  watch: {
    testPagePopup: {
      handler (val) {
        if (val.length) {
          let currentVueName = this.$options.name;
          if (val[0] === currentVueName) {
            this[popupConfig[this.$options.name]] = true;
          }
        }
      },
      deep: true
    },
    currentVueToggle (val) {
      if (!val) {
        this.shiftTestPagePopup();
      }
    }
  }
};

export {popupMixins};
