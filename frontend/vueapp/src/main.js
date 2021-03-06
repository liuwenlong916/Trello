import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/css.css'

import TMessage from '@/components/TMessage/TMessage.js'

import k from '@/components/KForm'
Vue.use(k)
//按需引用
// import { KInput, KButton } from './components/KForm'
// Vue.component('KInput', KInput)
// Vue.component('KButton', KButton)

// Vue.prototype.$message = TMessage
Vue.use(TMessage)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
