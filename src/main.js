import Vue from 'vue'
import App from './App.vue'
import store from './store'


Vue.config.productionTip = false

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
