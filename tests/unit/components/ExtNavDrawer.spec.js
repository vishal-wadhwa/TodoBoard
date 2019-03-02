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

  it('renders the board names with titles correctly', () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['v-list-tile-title'],
      localVue
    })

    const listItems = wrapper.findAll({ name: 'v-list-tile' })

    expect(listItems.length).toBe(boardList.length + 1)
    for (let i = 0; i < boardList.length; ++i) {
      expect(listItems.at(1 + i).text()).toMatch(boardList[i].boardName)
      expect(listItems.at(i + 1).attributes('title')).toBe(boardList[i].boardName)
    }
  })

  it('deletes the key of the board on which delete is triggered', async () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const delButton = wrapper.find({ name: 'v-btn' })
    const listItem = wrapper.find('.v-list__tile[title]')

    expect(wrapper.vm.deleteBtnVisible[boardList[0]._id]).toBeUndefined()

    listItem.trigger('mouseover')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.deleteBtnVisible[boardList[0]._id]).toBeTruthy()

    delButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.deleteBtnVisible[boardList[0]._id]).toBeUndefined()
  })

  it('mouseover/mouseout toggle visibility of deleteButton', async () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const delButton = wrapper.find({ name: 'v-btn' })
    // const listItem = wrapper.findAll({ name: 'v-list-tile' }).at(1)
    const listItem = wrapper.find('.v-list__tile[title]')

    expect(delButton.isVisible()).toBeFalsy()

    listItem.trigger('mouseover')
    await wrapper.vm.$nextTick()

    expect(delButton.isVisible()).toBeTruthy()

    listItem.trigger('mouseout')
    await wrapper.vm.$nextTick()

    expect(delButton.isVisible()).toBeFalsy()
  })

  it('updates the list view when a new board is added', async () => {
    const boardItem = { _id: 4, boardName: '___34rfa45#$$@__aefq4' }
    const boardListCopy = [...boardList]

    const wrapper = factory({
      propsData: { boardList: boardListCopy },
      localVue,
      stubs: ['router-link'],
      sync: false
    }, true)

    const list = wrapper.find({ name: 'v-list' })
    expect(list.text()).not.toMatch(boardItem.boardName)

    boardListCopy.push(boardItem)

    await wrapper.vm.$nextTick()

    expect(wrapper.props('boardList')[3]).toEqual(boardItem)
    expect(list.findAll({ name: 'v-list-tile' }).length).toBe(boardListCopy.length + 1)
    expect(list.text()).toMatch(boardItem.boardName)
  })

  it('updates the list view when a board is deleted', async () => {
    const boardListCopy = [...boardList]

    const wrapper = factory({
      propsData: { boardList: boardListCopy },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const list = wrapper.find({ name: 'v-list' })
    const boardNameToDelete = boardListCopy[0].boardName

    expect(list.text()).toMatch(boardNameToDelete)

    boardListCopy.splice(0, 1)

    await wrapper.vm.$nextTick()

    expect(wrapper.props('boardList')[0].boardName).not.toMatch(boardNameToDelete)
    expect(list.text()).not.toMatch(boardNameToDelete)
  })

  it('displays text-field for new board only after it is toggled', async () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    expect(wrapper.find({ name: 'v-text-field' }).isVisible()).toBeFalsy()
    wrapper.setProps({ showNewFieldBox: true })

    await wrapper.vm.$nextTick()
    expect(wrapper.find({ name: 'v-text-field' }).isVisible()).toBeTruthy()
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

  it('emits "end:board-click" when a list item is clicked', async () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const listItems = wrapper.findAll('.v-list__tile[title]')
    listItems.at(0).trigger('click')
    listItems.at(2).trigger('click')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:board-click')

    expect(emitArr.length).toBe(2)

    expect(emitArr[0].length).toBe(2)
    expect(emitArr[0][0]).toEqual(boardList[0]._id)
    expect(emitArr[0][1]).toBeInstanceOf(Event)

    expect(emitArr[1].length).toBe(2)
    expect(emitArr[1][0]).toEqual(boardList[2]._id)
    expect(emitArr[1][1]).toBeInstanceOf(Event)
  })

  it('emits "end:board-delete" when delete button is clicked', async () => {
    const wrapper = factory({
      propsData: { boardList },
      stubs: ['router-link'],
      localVue,
      sync: false
    }, true)

    const delButtons = wrapper.findAll('.v-btn')
    delButtons.at(0).trigger('click')
    delButtons.at(2).trigger('click')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:board-delete')

    expect(emitArr.length).toBe(2)

    expect(emitArr[0].length).toBe(2)
    expect(emitArr[0][0]).toEqual(boardList[0]._id)
    expect(emitArr[0][1]).toBeInstanceOf(Event)

    expect(emitArr[1].length).toBe(2)
    expect(emitArr[1][0]).toEqual(boardList[2]._id)
    expect(emitArr[1][1]).toBeInstanceOf(Event)
  })

  it('emits "end:bname-save" when enter-key is pressed', async () => {
    const wrapper = factory({
      localVue,
      propsData: { showNewFieldBox: true },
      sync: false
    }, true)

    wrapper.setData({ newBoardName })

    const textField = wrapper.find('input')
    textField.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:bname-save')
    expect(emitArr.length).toBe(1)
    expect(emitArr[0].length).toBe(2)
    expect(emitArr[0][0]).toBe(newBoardName)
    expect(emitArr[0][1]).toBeInstanceOf(Event)
  })

  it('emits "end:bname-save" when tick icon is clicked', async () => {
    const wrapper = factory({
      localVue,
      propsData: { showNewFieldBox: true },
      sync: false
    }, true)

    wrapper.setData({ newBoardName })

    const icon = wrapper.find('input')
    icon.trigger('click:append-outer')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:bname-save')
    expect(emitArr.length).toBe(1)
    expect(emitArr[0].length).toBe(2)
    expect(emitArr[0][0]).toBe(newBoardName)
    expect(emitArr[0][1]).toBeInstanceOf(Event)
  })

  it('emits "end:bname-discard" when esc-key is pressed', async () => {
    const wrapper = factory({
      localVue,
      propsData: { showNewFieldBox: true },
      sync: false
    }, true)

    wrapper.setData({ newBoardName })

    const textField = wrapper.find('input')
    textField.trigger('keydown.esc')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:bname-discard')
    expect(emitArr.length).toBe(1)
    expect(emitArr[0].length).toBe(1)
    expect(emitArr[0][0]).toBeInstanceOf(Event)
  })

  it('emits "end:blur" on textField blur', async () => {
    const wrapper = factory({
      localVue,
      propsData: { showNewFieldBox: true },
      sync: false
    }, true)

    const textField = wrapper.find('input')
    textField.trigger('blur')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:blur')
    expect(emitArr.length).toBe(1)
    expect(emitArr[0].length).toBe(1)
    expect(emitArr[0][0]).toBeInstanceOf(Event)
  })

  it('does not emit "end:bname-save" and goes into error state when boardName is empty', async () => {
    const wrapper = factory({
      localVue,
      propsData: { showNewFieldBox: true },
      sync: false
    }, true)

    const textField = wrapper.find('input')

    expect(wrapper.vm.errMsg).toBe('')

    textField.trigger('keydown.enter')

    await wrapper.vm.$nextTick()

    const emitArr = wrapper.emitted('end:bname-save')
    expect(emitArr).toBeUndefined()
    expect(wrapper.vm.errMsg).toBe(wrapper.vm.ERROR_MSG)
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

  it('should match snapshot when delete button is visible', async () => {
    const wrapper = factory({
      localVue,
      propsData: { boardList },
      stubs: ['router-link'],
      sync: false
    }, true)
    wrapper.setData({ newBoardName })

    const listItem = wrapper.find('.v-list__tile[title]')
    listItem.trigger('mouseover')

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
