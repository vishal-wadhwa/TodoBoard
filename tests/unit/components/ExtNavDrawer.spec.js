import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ExtNavDrawer from '@/components/ExtNavDrawer'
import Vuetify from 'vuetify'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(Vuetify)

describe('ExtNavDrawer.vue', () => {
  // required to vuetify [warn] in test
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.appendChild(app)

  // suppresses vuetify internal TypeError, tests pass regardless
  // console.log = jest.fn()

  let localVue = null
  let router = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(ExtNavDrawer, opts) : shallowMount(ExtNavDrawer, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    router = new VueRouter()
    localVue.use(router)
    // localVue.use(Vuetify)
  })

  const boardList = [
    { _id: 1, boardName: 'bjkgh1' },
    { _id: 2, boardName: 'bjhv2' },
    { _id: 3, boardName: 'bjhvkjh3' }
  ]
  const newBoardName = 'my-board-1234'

  it('renders the board names correctly', () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['v-list-tile-title'],
      localVue
    })

    const listItems = wrapper.findAll('vlisttile-stub')

    expect(listItems.length).toBe(boardList.length + 1)
    for (let i = 0; i < boardList.length; ++i) {
      expect(listItems.at(1 + i).text()).toMatch(boardList[i].boardName)
    }
  })

  it('updates the list view when a new board is added', () => {
    const boardItem = { _id: 4, boardName: '___34rfa45#$$@__aefq4' }
    const boardListCopy = [...boardList]

    const wrapper = factory({
      propsData: { boardList: boardListCopy },
      stubs: ['v-list-tile-title'],
      localVue
    })

    const list = wrapper.find('vlist-stub')
    expect(list.text()).not.toMatch(boardItem.boardName)

    boardListCopy.push(boardItem)
    setTimeout(() => expect(list.text()).toMatch(boardItem.boardName), 0)
  })

  it('displays text-field for new board only after it is toggled', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    expect(wrapper.find({ name: 'v-text-field' }).isVisible()).toBeFalsy()
    wrapper.setProps({ showNewFieldBox: true })
    setTimeout(() => expect(wrapper.find({ name: 'v-text-field' }).isVisible()).toBeTruthy(), 0)
  })

  it('has appropriate "to" property attached to list items', () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const routeLinks = wrapper.findAll({ name: 'v-list-tile' })

    for (let i = 1; i < routeLinks.length; ++i) {
      expect(routeLinks.at(i).props().to).toEqual(
        {
          name: 'home',
          params: { boardId: boardList[i - 1]._id }
        })
    }
  })

  it('emits "end:board-click" when a list item is clicked', () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const listItems = wrapper.findAll({ name: 'v-list-tile' })
    listItems.at(1).trigger('click')
    listItems.at(3).trigger('click')

    setTimeout(() => {
      const emitArr = wrapper.emitted('end:board-click')

      expect(emitArr.length).toBe(2)

      expect(emitArr[0].length).toBe(2)
      expect(emitArr[0][0]).toEqual(boardList[0])
      expect(emitArr[0][1]).toBeInstanceOf(Event)

      expect(emitArr[1].length).toBe(2)
      expect(emitArr[1][0]).toEqual(boardList[2])
      expect(emitArr[1][1]).toBeInstanceOf(Event)
    }, 0)
  })

  it('emits "end:bname-save" when enter-key is pressed', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    wrapper.setData({ newBoardName })
    const textField = wrapper.find({ name: 'v-text-field' })
    textField.trigger('keydown', { key: 'Enter' })

    setTimeout(() => {
      const emitArr = wrapper.emitted('end:bname-save')
      expect(emitArr.length).toBe(1)
      expect(emitArr[0].length).toBe(2)
      expect(emitArr[0][0]).toBe(newBoardName)
      expect(emitArr[0][1]).toBeInstanceOf(Event)
    }, 0)
  })

  it('emits "end:bname-save" when tick icon is clicked', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    wrapper.setData({ newBoardName })
    const icon = wrapper.find({ name: 'v-text-field' }).find({ name: 'v-icon' })
    icon.trigger('click')

    setTimeout(() => {
      const emitArr = wrapper.emitted('end:bname-save')
      expect(emitArr.length).toBe(1)
      expect(emitArr[0].length).toBe(2)
      expect(emitArr[0][0]).toBe(newBoardName)
      expect(emitArr[0][1]).toBeInstanceOf(Event)
    }, 0)
  })

  it('emits "end:bname-discard" when esc-key is pressed', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    wrapper.setData({ newBoardName })
    const textField = wrapper.find({ name: 'v-text-field' })
    textField.trigger('keydown', { key: 'Escape' })

    setTimeout(() => {
      const emitArr = wrapper.emitted('end:bname-save')
      expect(emitArr.length).toBe(1)
      expect(emitArr[0].length).toBe(1)
      expect(emitArr[0][0]).toBeInstanceOf(Event)
    }, 0)
  })

  it('does not emit "end:bname-save" and goes into error state when boardName is empty', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    const textField = wrapper.find({ name: 'v-text-field' })
    textField.trigger('keydown', { key: 'Enter' })

    expect(wrapper.vm.$data.errMsg).toBe('')

    setTimeout(() => {
      const emitArr = wrapper.emitted('end:bname-save')
      expect(emitArr.length).toBe(0)
      expect(wrapper.vm.$data.errMsg).toBe(wrapper.props('ERROR_MSG'))
    }, 0)
  })

  it('should match snapshot when text field is not visible', () => {
    const wrapper = factory({
      localVue,
      propsData: { boardList },
      stubs: ['router-link'],
      sync: false
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot when text field is visible', () => {
    const wrapper = factory({
      localVue,
      propsData: { boardList, showNewFieldBox: true },
      stubs: ['router-link'],
      sync: false
    }, true)
    wrapper.setData({ newBoardName })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
