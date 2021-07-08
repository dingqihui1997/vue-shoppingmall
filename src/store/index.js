import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//共享数据
    city: localStorage.getItem('position1'), //城市定位
    badge: localStorage.getItem('num'),//购物车的角标
  },
  mutations: { //修改
    setCity(state, data) {
      state.city = data
    },
    setBadge(state, data) {
      state.badge = data
    }
  },
  actions: {
  },
  modules: {
  }
})
