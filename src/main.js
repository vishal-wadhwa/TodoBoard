import Vue from 'vue'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/stylus/main.styl'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
