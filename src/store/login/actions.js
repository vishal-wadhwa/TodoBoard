import storage from '@/utils/storage_utils'

// dummy interface, can be replaced with other actions-set
const dummyActions = {
  async login ({ commit }, payload) {
    commit('login', payload)
  },
  async signUp ({ commit }, payload) {
    commit('signUp', payload)
  },
  async logout ({ commit }) {
    commit('logout')
  }
}

const localActions = {
  async login ({ commit }, payload) {
    commit('login', { err: 'Invalid credentials!' })
  },
  async signUp ({ commit }, payload) {
    const data = {
      fullname: payload.fullname,
      email: payload.email
    }
    storage.writeObject('user', data)
    commit('signUp', data)
  },
  async logout ({ commit }) {
    storage.clear('user')
    commit('logout')
  }
}

export {
  dummyActions,
  localActions
}

export default localActions
