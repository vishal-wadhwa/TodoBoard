import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import BaseList from '@/components/BaseList/BaseList'
import BaseListItem from '@/components/BaseList/BaseListItem'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('BaseList.vue', () => {
  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(BaseList, opts) : shallowMount(BaseList, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const header = 'List1'
  const showCount = false
  const list = [{
    'title': 'sanmu',
    'desc': 'oh cunihnon vocew lab sirrufoka loj ujo utceb lez ej',
    'tags': ['fa', 'jebpu'],
    '_id': 87,
    'type': 'list'
  }, {
    'title': 'iz',
    'desc': 'vuha ogpufub in jufwozi mira ep po gozseic burni zictam',
    'tags': ['sikgaok', 'co'],
    '_id': 21,
    'type': 'playlist_play'
  }, {
    'title': 'duzjukve',
    'desc': 'giv howseb ikopir lo vehladdih delolir uj dafassu joig mocun',
    'tags': ['magew', 'wobsudig'],
    '_id': 93
  }]

  it('renders list header', () => {
    const wrapper = factory({
      propsData: { header },
      localVue
    })
    expect(wrapper.text()).toMatch(header)
  })

  it('shows count by default', () => {
    const wrapper = factory({
      propsData: { header },
      localVue
    })
    const avatarWrapper = wrapper.find('div.headline :first-child')
    expect(avatarWrapper.text()).toMatch('0')
  })

  it('does not show count when prop set to `false`', () => {
    const wrapper = factory({
      propsData: { showCount, header },
      localVue
    })
    const avatarWrapper = wrapper.find('div.headline :first-child')
    expect(avatarWrapper.exists()).toBeFalsy()
  })

  it('renders only 1 new list item when list is not passed', () => {
    const wrapper = factory({
      propsData: { header }
    })
    const baseListItems = wrapper.findAll(BaseListItem)
    expect(baseListItems.length).toEqual(1)
    expect(baseListItems.at(0).vm.$props['view']).toEqual('new')
  })

  it('renders a list of correct length and count is reflected in the list counter', () => {
    const wrapper = factory({
      propsData: { header, list },
      localVue
    })
    const baseListItems = wrapper.findAll(BaseListItem)
    expect(baseListItems.length).toEqual(1 + list.length)
    const avatarWrapper = wrapper.find('div.headline :first-child')
    expect(avatarWrapper.text()).toMatch(list.length + '')
  })

  // not updating synchronously because of [this](https://github.com/vuejs/vue-test-utils/issues/676)
  // nextTick also not working. Had to use setTimeout.
  it('updates list items and count when list prop is updated', () => {
    let listCopy = list.slice(1)
    const wrapper = factory({
      propsData: { header, list: listCopy },
      localVue
      // sync: false
    })

    let baseListItems = wrapper.findAll(BaseListItem)
    expect(baseListItems.length).toEqual(1 + listCopy.length)
    let avatarWrapper = wrapper.find('div.headline :first-child')
    expect(avatarWrapper.text()).toMatch(listCopy.length + '')
    // add new element
    listCopy.push({
      '_id': '29',
      'title': 'founo',
      'desc': 'pa lafapnet te safaw mitlevamu bujufput so cora kokwegti pipwos',
      'tags': ['ceto', 'pumagop'],
      'type': 'format_list_bulleted'
    })

    // return Vue.nextTick().then(() => {
    setTimeout(() => {
      baseListItems = wrapper.findAll(BaseListItem)
      expect(baseListItems.length).toEqual(1 + listCopy.length)
      avatarWrapper = wrapper.find('div.headline :first-child')
      expect(avatarWrapper.text()).toMatch(listCopy.length + '')
    }, 0)
    // })
  })

  it('emits "bl:click" with that item\'s payload on clicking the item', () => {
    const wrapper = factory({
      propsData: { header, list },
      localVue
    }, true)

    const baseListItems = wrapper.findAll(BaseListItem)
    const idx = Math.random() * (baseListItems.length - 1) >> 0
    const someListItem = baseListItems.at(idx)

    someListItem.trigger('click')

    const emitObj = wrapper.emitted('bl:click')
    expect(emitObj).toBeTruthy()
    expect(emitObj[0][0]).toEqual(list[idx])
  })

  // same issue child componenent not mounting
  it('emits "bl:add" on clicking the last list item', () => {
    const wrapper = factory({
      propsData: { header, list },
      localVue
    }, true)

    const listOfItemWrappers = wrapper.findAll(BaseListItem)
    const lastItem = listOfItemWrappers.at(listOfItemWrappers.length - 1)

    lastItem.trigger('click')

    const emitObj = wrapper.emitted('bl:add')
    expect(emitObj).toBeTruthy()
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      propsData: { header, list },
      stubs: {
        'base-list-item': '<div></div>'
      }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
