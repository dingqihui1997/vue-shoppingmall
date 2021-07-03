import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//共享数据
    city: '定位中'
  },
  mutations: { //修改
    setCity() {
      set.city = data
    }
  },
  actions: {
  },
  modules: {
  }
})
