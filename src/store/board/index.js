import actions from './actions.js'
import router from '@/router.js'

const ID_FIND_CMP = tfId => ob => ob._id === tfId

export default {
  namespaced: true,
  state: {
    boards: [
      {
        _id: '1',
        lists: [],
        boardName: 'My board'
      }
    ]
  },
  getters: {
    boardNames (state) {
      return state.boards.map(ob => ({ _id: ob._id, boardName: ob.boardName }))
    },
    boardById (state, getters, rootState) {
      return state.boards.find(ID_FIND_CMP(rootState.route.params.boardId))
    }
  },
  mutations: {
    setActiveBoard (state, id) {
      router.push({ name: 'home', params: { boardId: id } })
    },
    createBoard (state, payload) {
      const _id = `${(new Date()).getTime()}`

      state.boards.push({
        _id,
        lists: [],
        boardName: payload.boardName || 'New Board'
      })

      router.push({ name: 'home', params: { boardId: _id } })
    },
    createList (state, payload) {
      const board = state.boards.find(ID_FIND_CMP(router.currentRoute.params.boardId))
      if (!board) {
        // failed
        return
      }

      board.lists.push({
        tags: payload.tags || [],
        header: payload.header || '',
        highlightColor: payload.highlightColor || '#000000',
        _id: `${board.boardName}:${(new Date()).getTime()}`,
        list: []
      })
    },
    createListItem (state, payload) {
      const board = state.boards.find(ID_FIND_CMP(router.currentRoute.params.boardId))
      if (!board) {
        // failed
        return
      }

      const list = board.lists.find(ID_FIND_CMP(payload.listId))
      list.list.push({
        _id: `${board.boardName}:${list.header}:${(new Date()).getTime()}`,
        title: payload.listItem.title || '',
        desc: payload.listItem.desc || '',
        tags: payload.listItem.tags || [],
        type: payload.listItem.type || 'assignment'
      })
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
