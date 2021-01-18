import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import storage from '@/tools/localStorage';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    numA: 0,
    numB: 0,
    // 历史路由栈
    routerHistory: [],
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
      // 需要中转，不能直接赋值，vue内部数据处理的问题
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
