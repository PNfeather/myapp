import {mapState, mapMutations} from 'vuex';

const popupMixins = {
  data () {
    return {
    };
  },
  methods: {
    ...mapMutations(['pushTestPagePopup', 'shiftTestPagePopup'])
  },
  computed: {
    ...mapState(['testPagePopup'])
  }
};

export {popupMixins};
