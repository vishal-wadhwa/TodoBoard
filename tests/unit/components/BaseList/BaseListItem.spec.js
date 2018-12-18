import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import BaseListItem from '@/components/BaseList/BaseListItem'
import Vuetify from 'vuetify'
import Vue from 'vue'
// import VChip from 'vuetify/lib/components/VChip'
Vue.use(Vuetify)

describe('BaseListItem.vue', () => {
  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(BaseListItem, opts) : shallowMount(BaseListItem, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const title = 'Note1'
  const desc = 'random desc'
  const tags = ['Lesson1', 'Lesson2']
  // NEW VIEW TEST
  it('renders title in new view', () => {
    const wrapper = factory({
      propsData: { title },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('does not render desc or tags in new view', () => {
    const wrapper = factory({
      propsData: { title, desc, tags },
      localVue
    })
    expect(wrapper.text()).not.toMatch(desc)
    expect(wrapper.text()).not.toMatch(new RegExp(tags.join('|')))
  })

  // FULL VIEW TEST
  it('renders title in full view', () => {
    const view = 'full'
    const wrapper = factory({
      propsData: { title, view },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('renders desc and tags in full view', () => {
    const view = 'full'
    const wrapper = factory({
      propsData: { view, desc, title, tags },
      localVue
    })
    expect(wrapper.text()).toMatch(desc)
    expect(wrapper.text()).toMatch(new RegExp(tags.join('|')))
  })

  // COMPACT VIEW TEST
  it('renders title in compact view', () => {
    const view = 'compact'
    const wrapper = factory({
      propsData: { view, title },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('does not render desc or tags in compact view', () => {
    const view = 'compact'
    const wrapper = factory({
      propsData: { view, title, tags, desc },
      localVue
    })
    expect(wrapper.text()).not.toMatch(desc)
    expect(wrapper.text()).not.toMatch(new RegExp(tags.join('|')))
  })

  // GENERAL TEST
  it('emits "bli:click" with props data on clicking the container', () => {
    const wrapper = factory({
      propsData: { title, tags, desc },
      localVue
    }, true)

    wrapper.trigger('click')
    const emitObj = wrapper.emitted('bli:click')
    expect(emitObj).toBeTruthy()
    expect(emitObj[0][0]).toEqual(wrapper.props())
  })

  it('should match full view snapshot', () => {
    const view = 'full'
    const wrapper = factory({
      propsData: { title, tags, desc, view }
    })
    wrapper.setMethods({
      tagColor: () => 'primary'
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match new view snapshot', () => {
    const view = 'new'
    const wrapper = factory({
      propsData: { title, tags, desc, view }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match compact view snapshot', () => {
    const view = 'compact'
    const wrapper = factory({
      propsData: { title, tags, desc, view }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
