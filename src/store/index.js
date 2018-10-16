import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    numA: 0,
    numB: 0
  },
  getters: {
    sumState: (state) => (numC) => {
      return state.numA + state.numB + numC || 0;
    }
  },
  mutations: {
    changeNum (state, payload = {numType: 'numA', value: 0}) {
      state[payload.numType] += payload.value;
    }
  },
  actions: {
    getNumAndChange ({ commit }, payload = {numType: 'numA', value: 0}) {
      setTimeout(() => {
        commit('changeNum', payload);
      }, 500);
    }
  }
});

Vue.$store = store;

export default store;
