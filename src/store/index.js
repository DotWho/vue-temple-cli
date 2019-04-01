import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

let modules = {}

function rename(key) {
    let name = key
        .replace(/\.+\//, '')
        .replace(/\.js/, '')
        .replace(/^(\w)/, v => v.toLowerCase())
    return name
}

const requireContext = require.context('./modules', true, /.*\.js/)
requireContext.keys().map(key => {
    modules[rename(key)] = requireContext(key).default
})

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules
})
