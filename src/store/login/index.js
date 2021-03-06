import Vue from 'vue'
import actions from './actions'
import storage from '@/utils/storage_utils'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: storage.readObject('user')
  },
  getters: {
    isLoggedIn (state) {
      return !!state.user && !!state.user.fullname && !!state.user.email
    },
    fullname (state, getters) {
      return getters.isLoggedIn && state.user.fullname
    },
    email (state, getters) {
      return getters.isLoggedIn && state.user.email
    }
  },
  mutations: {
    login (state, payload) {
      if (payload.err) {
        Vue.notify(payload.err)
        return
      }

      state.user = {
        fullname: payload.fullname,
        email: payload.email
      }

      router.push({ name: 'home' })
    },
    signUp (state, payload) {
      if (payload.err) {
        Vue.notify(payload.err)
        return
      }

      state.user = {
        fullname: payload.fullname,
        email: payload.email
      }

      router.push({ name: 'home' })
    },
    logout (state) {
      state.user = null

      router.push({ name: 'login' })
    }
  },
  actions
}
