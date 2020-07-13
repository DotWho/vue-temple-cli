import Vue from 'vue'
import * as types from './mutation-types'

function commit(type, data) {
  mutations[type](state, data)
}

const state = {
  id: '',
  name: '',
  role: []
}

const store = Vue.observable(state)

const mutations = {
  [types.SET_USER](state, data) {
    state.id = String(data.id || '')
    state.name = data.name
    state.role = data.role
  }
}

const actions = {
  setUser({ commit }, res) {
    commit(types.SET_USER, res)
  }
}

export default {
  getters: store,
  dispatch: (action, data) => {
    return actions[action]({ commit }, data)
  }
}
