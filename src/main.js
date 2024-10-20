import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './css/index.scss'

import { borderBox13, digitalFlop, capsuleChart } from '@jiaminghi/data-view'
import ItemWrap from './components/item-wrap/index.vue'
import EchartsWrap from './components/echarts-wrap/index.vue'


require('./mock/mock')
Vue.config.productionTip = false

Vue.component("ItemWrap",ItemWrap)
Vue.component("EchartsWrap",EchartsWrap)

Vue.use(borderBox13)
Vue.use(digitalFlop)
Vue.use(capsuleChart)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
