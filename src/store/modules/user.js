import * as types from '../mutation-types'
import Api from '@/api/sources/common'
import Common from '@/utils/common'
import router from '@/router'

const user = {
    state: {
        token: ''
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        [types.SET_TOKEN](state, data) {
            
        },
        [types.SET_USER](state, data) {
            
        },
        [types.CLEAR_USER](state) {
            
        }
    },
    actions: {
        setToken({ commit }, data) {
            // commit(types.SET_TOKEN, data)
        },
        setUser({ commit }) {
            // commit(types.CLEAR_USER)
        },
        clearUser({ commit }) {
            // commit(types.CLEAR_USER)
        }
    }
}

export default user
