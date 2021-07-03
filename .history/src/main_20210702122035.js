import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import Vant from 'vant';
Vue.use(Vant);
import 'vant/lib/index.css' //引入
Vue.config.productionTip = false
Vue.prototype.$api = api   //挂载成全局变量

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
