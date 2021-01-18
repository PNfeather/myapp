import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import storage from '@/tools/localStorage';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    numA: 0,
    numB: 0,
    routerHistory: [], // 历史路由
    isFirstRouter: false // 页面是否是第一次加载项目页面
  },
  getters: {
    sumState: (state) => (numC) => {
      return state.numA + state.numB + numC || 0;
    }
  },
  mutations: {
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
      const result = state.routerHistory.slice(0, value);
      state.routerHistory = result;
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
  },
  plugins: [
    // store数据持久化
    createPersistedState({
      storage: {
        getItem: (key) => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.remove(key)
      },
      reducer (state) {
        return {
          routerHistory: state.routerHistory
        };
      }
    })
  ]
});

Vue.$store = store;

export default store;
