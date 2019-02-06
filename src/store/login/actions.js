import storage from '@/utils/storage_utils'

// dummy interface, can be replaced with other actions-set
const dummyActions = {
  async login ({ commit }, payload) {
    commit('login', payload)
  },
  async signUp ({ commit }, payload) {
    commit('signUp', payload)
  }
}

const localActions = {
  async login ({ commit }, payload) {
    const data = {
      fullname: payload.fullname || 'New user',
      email: payload.email || 'new_user@example.com'
    }
    storage.writeObject('user', data)
    commit('login', data)
  },
  async signUp ({ commit }, payload) {
    const data = {
      fullname: payload.fullname || 'New user',
      email: payload.email || 'new_user@example.com'
    }
    storage.writeObject('user', data)
    commit('signUp', data)
  }
}

export {
  dummyActions,
  localActions
}

export default localActions
