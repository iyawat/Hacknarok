import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import axios from 'axios'
window.axios = axios

import VueGtag from "vue-gtag"
Vue.use(VueGtag, {
  config: { id: "UA-141672389-4" }
})

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

Vue.config.productionTip = false

Vue.prototype.$liff = window.liff

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

