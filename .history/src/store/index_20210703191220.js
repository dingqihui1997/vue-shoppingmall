import Vue from 'vue'
import Vuex from 'vuex'
import city from '../lib/city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//共享数据
    city: '定位中'
  },
  mutations: { //修改
    setCity(state, data) {
      state.city = data
    }
  },
  actions: {
  },
  modules: {
  }
})
