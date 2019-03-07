import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    numA: 0,
    numB: 0,
    routerHistory: [], // 历史路由
    isFirstRouter: false, // 页面是否是第一次加载项目页面
    testPagePopup: []
  },
  getters: {
    sumState: (state) => (numC) => {
      return state.numA + state.numB + numC || 0;
    }
  },
  mutations: {
    pushTestPagePopup (state, value) {
      state.testPagePopup.push(value);
    },
    shiftTestPagePopup (state) {
      state.testPagePopup.shift();
    },
    changeNum (state, payload = {numType: 'numA', value: 0}) {
      state[payload.numType] += payload.value;
    },
    pushRouterHistory (state, value) {
      state.routerHistory.push(value);
    },
    popRouterHistory (state) {
      state.routerHistory.pop();
    },
    shiftRouterHistory (state) {
      state.routerHistory.shift();
    },
    sliceRouterHistory (state, value) {
      state.routerHistory = state.routerHistory.slice(0, value);
    },
    changeIsFirstRouter (state, val) {
      state.isFirstRouter = val;
    }
  },
  actions: {
    getNumAndChange ({ commit }, payload = {numType: 'numA', value: 0}) {
      setTimeout(() => {
        commit('changeNum', payload);
      }, 500);
    },
    doPushRouterHistory ({commit}, value) {
      commit('pushRouterHistory', value);
    },
    doPopRouterHistory ({commit}) {
      commit('popRouterHistory');
    },
    doShiftRouterHistory ({commit}) {
      commit('shiftRouterHistory');
    },
    doSliceRouterHistory ({commit}, value) {
      commit('sliceRouterHistory', value);
    },
    doChangeIsFirstRouter ({commit}, value) {
      commit('changeIsFirstRouter', value);
    }
  }
});

Vue.$store = store;

export default store;
