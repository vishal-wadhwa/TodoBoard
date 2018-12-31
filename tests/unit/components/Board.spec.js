import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Board from '@/components/Board'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('Board.vue', () => {
  // required to vuetify [warn] in snapshot test
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(Board, opts) : shallowMount(Board, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const boardName = 'Create new board'
  const lists = [
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

  it('renders default board name', () => {
    const wrapper = factory({
      localVue
    })
    expect(wrapper.text()).toMatch(Board.props.boardName.default)
  })

  it('renders board name from props', () => {
    const wrapper = factory({
      propsData: { boardName },
      localVue
    })
    expect(wrapper.text()).not.toMatch(Board.props.boardName.default)
    expect(wrapper.text()).toMatch(boardName)
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue,
      propsData: { boardName, lists },
      stubs: ['base-list-item'],
      sync: false
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
