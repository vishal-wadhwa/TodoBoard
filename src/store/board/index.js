import Vue from 'vue'
import actions from './actions.js'
import router from '@/router.js'
import storage from '@/utils/storage_utils.js'

const ID_FIND_CMP = tfId => ob => ob._id === tfId
const boardsInit = () => {
  const boardList = storage.readObject('BOARDS', [])
  return boardList.map(ob => ({ ...ob, lists: [] }))
}

export default {
  namespaced: true,
  state: {
    boards: boardsInit()
  },
  getters: {
    boardNames (state) {
      return state.boards.map(ob => ({ _id: ob._id, boardName: ob.boardName }))
    },
    activeBoard (state, getters) {
      return state.boards.find(ID_FIND_CMP(getters.activeBoardId))
    },
    activeBoardId (state, getters, rootState) {
      return rootState.route.params.boardId
    }
  },
  mutations: {
    setActiveBoard (state, { boardId, data }) {
      state.boards.find(ID_FIND_CMP(boardId)).lists = data
      router.push({ name: 'home', params: { boardId } })
    },
    createBoard (state, payload) {
      if (payload.err) {
        Vue.notify(payload.err)
        return
      }

      state.boards.push({
        ...payload,
        lists: []
      })

      Vue.notify({ type: 'success', msg: `Created board ${payload.boardName}` })
      router.push({ name: 'home', params: { boardId: payload._id } })
    },
    createList (state, payload) {
      if (payload.err) {
        Vue.notify(payload.err)
        return
      }

      const data = { ...payload }
      delete data.boardId

      const board = state.boards.find(ID_FIND_CMP(payload.boardId))
      board.lists.push({
        ...data,
        list: []
      })
      Vue.notify({ type: 'success', msg: `Created new list in board ${board.boardName}` })
    },
    createListItem (state, payload) {
      if (payload.err) {
        Vue.notify(payload.err)
        return
      }

      const data = { ...payload }
      delete data.listId
      delete data.boardId

      const board = state.boards.find(ID_FIND_CMP(payload.boardId))
      const list = board.lists.find(ID_FIND_CMP(payload.listId))
      list.list.push({ ...data, type: list.type })
    }
  },
  actions
}

/**
  {
      list: randomData({
        _type: Array,
        _len: 3,
        _valType: {
          title: String,
          desc: {
            _type: Array,
            _len: 10,
            _valType: String
          },
          tags: {
            _type: Array,
            _len: 2,
            _valType: String
          }
        }
      }).map(it => {
        let nit = { ...it }
        nit['desc'] = nit['desc'].join(' ')
        nit['type'] = ['format_list_bulleted', 'list', 'playlist_play', 'assignment'][Math.random() * 4 >> 0]
        // nit["view"] = 'full'
        nit['_id'] = Math.random() * 100 >> 0
        return nit
      }),
      bItems: [
        {
          _id: 'lst-1',
          highlightColor: '#abcdef',
          header: 'List1',
          tags: ['haha', 'llssd'],
          list: [
            {
              _id: 'lst-1:it-1',
              title: 'sanmu',
              desc: 'oh cunihnon vocew lab sirrufoka loj ujo utceb lez ej',
              tags: ['fa', 'jebpu'],
              type: 'list'
            },
            {
              title: 'iz',
              desc: 'vuha ogpufub in jufwozi mira ep po gozseic burni zictam',
              tags: ['sikgaok', 'co'],
              _id: 'lst-1:it-2',
              type: 'playlist_play'
            }
          ]
        },
        {
          _id: 'lst-2',
          highlightColor: '#12cdef',
          header: 'List2',
          tags: ['11haha', '22llssd'],
          list: [
            {
              _id: 'lst-2:it-1',
              title: 'sanmu',
              desc: 'oh cunihnon vocew lab sirrufoka loj ujo utceb lez ej',
              tags: ['fa', 'jebpu'],
              type: 'list'
            },
            {
              title: 'iz',
              desc: 'vuha ogpufub in jufwozi mira ep po gozseic burni zictam',
              tags: ['sikgaok', 'co'],
              _id: 'lst-2:it-2',
              type: 'playlist_play'
            }
          ]
        },
        {
          _id: 'lst-3',
          highlightColor: '#a122ef',
          header: 'List3',
          tags: ['3haha', '33llssd'],
          list: [
            {
              _id: 'lst-3:it-1',
              title: 'duzjukve',
              desc: 'giv howseb ikopir lo vehladdih delolir uj dafassu joig mocun',
              tags: ['magew', 'wobsudig']
            }
          ]
        }
      ]
    }
 */
