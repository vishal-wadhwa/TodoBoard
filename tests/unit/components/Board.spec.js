import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Board from '@/components/Board'
import BaseList from '@/components/BaseList/BaseList'
import ListItemForm from '@/components/ListItemForm'
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

  it('sets initial state of each board item to normal', () => {
    const wrapper = factory({
      propsData: { boardName, lists },
      localVue
    })

    for (const bi of wrapper.vm.boardItems) {
      expect(bi._state).toBe(wrapper.vm.STATE_ITEM_NORMAL)
    }
  })

  it('updates the state of the board item for which the add button is clicked', async () => {
    const wrapper = factory({
      propsData: { boardName, lists },
      localVue,
      stubs: { 'list-item-form': true },
      sync: false
    }, true)

    expect(wrapper.vm.boardItems[1]._state).toBe(wrapper.vm.STATE_ITEM_NORMAL)

    const addButtonContainers = wrapper.findAll(BaseList)
    addButtonContainers.at(1).find('div.layout.justify-center button').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.boardItems[1]._state).toBe(wrapper.vm.STATE_ITEM_ADD)
  })

  it('toggles visibility of form when state is changed', async () => {
    const wrapper = factory({
      propsData: { boardName, lists },
      localVue,
      sync: false
    })

    const listItemForm = wrapper.find(ListItemForm)
    expect(listItemForm.isVisible()).toBeFalsy()
    wrapper.vm.boardItems[0]._state = wrapper.vm.STATE_ITEM_ADD

    await wrapper.vm.$nextTick()

    expect(listItemForm.isVisible()).toBeTruthy()
  })

  it('emits "b:new-list-item" when form emits "lif:save"', async () => {
    const wrapper = factory({
      propsData: { boardName, lists },
      localVue,
      sync: false
    }, true)

    const listItemForm = wrapper.findAll(ListItemForm).at(1)
    listItemForm.vm.$emit('lif:save', {}, new Event('click'))

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('b:new-list-item')
    expect(emitArr).toBeDefined()
    expect(emitArr.length).toBe(1)
    expect(emitArr[0][0]).toEqual({ listId: lists[1]._id, listItem: {} })
    expect(emitArr[0][1]).toBeInstanceOf(Event)
  })

  it('emits "b:item-delete" when item emits "bl:item-delete"', async () => {
    const wrapper = factory({
      propsData: { boardName, lists },
      localVue,
      stubs: { 'list-item-form': true },
      sync: false
    }, true)

    const randomId = 2332
    const baseList = wrapper.findAll(BaseList).at(2)
    baseList.vm.$emit('bl:item-delete', randomId, new Event('click'))

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('b:item-delete')
    expect(emitArr).toBeDefined()
    expect(emitArr.length).toBe(1)
    expect(emitArr[0][0]).toEqual({ listId: lists[2]._id, listItemId: randomId })
    expect(emitArr[0][1]).toBeInstanceOf(Event)
  })

  it('emits "b:list-delete" when item emits "bl:delete"', async () => {
    const wrapper = factory({
      propsData: { boardName, lists },
      localVue,
      stubs: { 'list-item-form': true },
      sync: false
    }, true)

    const baseList = wrapper.findAll(BaseList).at(2)
    baseList.vm.$emit('bl:delete', new Event('click'))

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('b:list-delete')
    expect(emitArr).toBeDefined()
    expect(emitArr.length).toBe(1)
    expect(emitArr[0][0]).toEqual(lists[2]._id)
    expect(emitArr[0][1]).toBeInstanceOf(Event)
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue,
      propsData: { boardName, lists },
      stubs: { 'base-list-item': true },
      sync: false
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when form is visible', async () => {
    const wrapper = factory({
      localVue,
      propsData: { boardName, lists },
      stubs: { 'base-list-item': true },
      sync: false
    }, true)

    const listItemForm = wrapper.find(ListItemForm)
    wrapper.vm.boardItems[0]._state = wrapper.vm.STATE_ITEM_ADD

    await wrapper.vm.$nextTick()

    expect(listItemForm.isVisible()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
