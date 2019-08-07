import Vue from 'vue'
import * as types from './mutation-types'

function commit(type, data) {
  mutations[type](state, data)
}

const state = {
  email: ''
}

const store = Vue.observable(state)

const mutations = {
  [types.SET_USER](state, data) {
    state.email = data.email
  }
}

const actions = {
  setUser({ commit }, res) {
    commit(types.SET_USER, {
      email: res.data.user.email
    })
  }
}

export default {
  getters: store,
  dispatch: (action, data) => {
    return actions[action]({ commit }, data)
  }
}
