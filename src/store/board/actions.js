import storage from '@/utils/storage_utils'

const ID_FIND_CMP = tfId => ob => ob._id === tfId

// dummy interface, can be replaced with other actions-set
const dummyActions = {
  async loadBoard ({ state, commit }, boardId) {
    commit('setActiveBoard', { boardId, data: state.boards.find(ID_FIND_CMP(boardId)).lists })
  },
  async createBoard ({ commit }, payload) {
    const _id = new Date().getTime().toString()
    const npayload = { ...payload, _id }

    commit('createBoard', npayload)
  },
  async deleteBoard ({ commit }, payload) {
    commit('deleteBoard', payload)
  },
  async createList ({ commit, getters }, payload) {
    const bid = getters.activeBoardId
    const _id = bid + ':' + new Date().getTime().toString()
    const npayload = { ...payload, _id, boardId: bid }

    commit('createList', npayload)
  },
  async createListItem ({ commit, getters }, payload) {
    const bid = getters.activeBoardId
    const _id = payload.listId + ':' + new Date().getTime().toString()
    const npayload = { ...payload.listItem, _id, boardId: bid, listId: payload.listId }

    commit('createListItem', npayload)
  }
}

const localActions = {
  async loadBoard ({ state, commit }, boardId) {
    const payload = { boardId }
    const board = state.boards.find(ID_FIND_CMP(boardId))

    if (board.lists.length > 0) {
      payload.data = board.lists
    } else {
      payload.data = storage.readObject('BOARD_DATA_' + boardId, [])
    }

    commit('setActiveBoard', payload)
  },
  async createBoard ({ commit }, payload) {
    const _id = new Date().getTime().toString()
    const npayload = { ...payload, _id }
    const boardItems = storage.readObject('BOARDS', [])

    boardItems.push(npayload)
    storage.writeObject('BOARDS', boardItems)

    commit('createBoard', npayload)
  },
  async deleteBoard ({ commit }, payload) {
    const _id = payload._id
    const boardItems = storage.readObject('BOARDS', [])
    const delBIdx = boardItems.findIndex(ID_FIND_CMP(_id))

    boardItems.splice(delBIdx, 1)

    const bItemsWithoutList = boardItems.map(bi => {
      const { lists, ...biListLess } = bi
      return biListLess
    })

    storage.writeObject('BOARDS', bItemsWithoutList)
    storage.clear('BOARD_DATA_' + _id)

    commit('deleteBoard', payload)
  },
  async createList ({ getters, commit }, payload) {
    const bid = getters.activeBoardId
    const _id = bid + ':' + new Date().getTime().toString()
    const npayload = { ...payload, _id }
    const listItems = storage.readObject('BOARD_DATA_' + bid, [])

    listItems.push(npayload)
    storage.writeObject('BOARD_DATA_' + bid, listItems)

    commit('createList', { ...npayload, boardId: bid })
  },
  async createListItem ({ commit, getters }, payload) {
    const bid = getters.activeBoardId
    const _id = payload.listId + ':' + new Date().getTime().toString()
    const npayload = { ...payload.listItem, _id }
    const listItems = storage.readObject('BOARD_DATA_' + bid, [])
    const list = listItems.find(ID_FIND_CMP(payload.listId))

    if (Array.isArray(list.list)) list.list.push(npayload)
    else list.list = [npayload]

    storage.writeObject('BOARD_DATA_' + bid, listItems)

    commit('createListItem', { ...npayload, boardId: bid, listId: payload.listId })
  },
  async deleteListItem ({ commit, getters }, payload) {
    const bid = getters.activeBoardId
    const { listId, listItemId } = payload
    const lists = storage.readObject('BOARD_DATA_' + bid, [])
    const list = lists.find(ID_FIND_CMP(listId))

    list.list.splice(list.list.findIndex(ID_FIND_CMP(listItemId)), 1)

    storage.writeObject('BOARD_DATA_' + bid, lists)

    commit('deleteListItem', { boardId: bid, ...payload })
  }
}

export {
  dummyActions,
  localActions
}

export default localActions
