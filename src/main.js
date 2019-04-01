import Vue from 'vue'

import App from './App'

import store from './store'

import router from './router'

import components from './components'
Vue.use(components)

import filter from './filter'
Vue.use(filter)

import directive from './directive'
Vue.use(directive)

import plugin from './plugin'
Vue.use(plugin)

import Api from './api'
Vue.use(Api)

import Common from './utils'
Vue.use(Common)

import '@/style/base.scss'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
