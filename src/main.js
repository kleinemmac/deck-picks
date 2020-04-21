import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueDebounce from 'vue-debounce'
import VueTour from 'vue-tour'
require('vue-tour/dist/vue-tour.css')

Vue.use(vueDebounce, {
  listenTo: 'input'
})

Vue.use(VueTour)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
