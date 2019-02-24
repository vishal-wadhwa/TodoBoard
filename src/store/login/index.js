import actions from './actions'
import storage from '@/utils/storage_utils'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: (() => storage.readObject('user'))()
  },
  getters: {
    isLoggedIn (state) {
      return !!state.user && !!state.user.fullname && !!state.user.email && process.env.NODE_ENV !== 'production'
    }
  },
  mutations: {
    login (state, payload) {
      if (payload.err) {
        // error notif
        console.log(payload.err)
        return
      }

      state.user = {
        fullname: payload.fullname,
        email: payload.email
      }
      router.push({ name: 'home', params: { boardId: '1' } }) // replace with constant
    },
    signUp (state, payload) {
      if (payload.err) {
        // error notif
        console.log(payload.err)
        return
      }

      state.user = {
        fullname: payload.fullname,
        email: payload.email
      }
      router.push({ name: 'home', params: { boardId: '1' } })
    },
    logout (state) {
      state.user = null
      router.push({ name: 'login' })
    }
  },
  actions
}
