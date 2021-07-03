import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './http/api'
import Vant from 'vant';
import 'vant/lib/index.css' //引入
import Top from './components/top/Top.vue' //注册全局组件

Vue.component('top', Top)

Vue.config.productionTip = false
Vue.prototype.$api = api   //挂载成全局变量



Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
