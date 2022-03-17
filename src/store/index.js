import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token') !== null,
    user: {
      name: 'no data'
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
