import {mapMutations} from 'vuex';

const popupMixins = {
  methods: {
    ...mapMutations(['pushTestPagePopup', 'shiftTestPagePopup'])
  }
};

export {popupMixins};
