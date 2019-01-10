// dummy interface, can be replaced with other actions-set
export default {
  async loadBoard ({ commit }, id) {
    commit('setActiveBoard', id)
  },
  async createBoard ({ commit }, payload) {
    commit('createBoard', payload)
  },
  async createList ({ commit }, payload) {
    commit('createList', payload)
  },
  async createListItem ({ commit }, payload) {
    commit('createListItem', payload)
  }
}
