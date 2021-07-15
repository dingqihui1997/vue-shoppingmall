import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import Vant from 'vant';
import 'vant/lib/index.css' //引入
import top from './components/top/Top.vue' //注册全局组件
import floornum from './components/flootnum/FloorNum.vue'
import load from './load/load.vue'
import utils from './utils'
Vue.component('floornum', floornum)
Vue.component('load', load)

Vue.component('top', top)

Vue.config.productionTip = false
Vue.prototype.$api = api   //挂载成全局变量
Vue.prototype.$utils = utils


Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
