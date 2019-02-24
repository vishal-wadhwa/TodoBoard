import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import TitleBar from '@/components/TitleBar'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('TitleBar.vue', () => {
  // required to vuetify [warn] in test
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  // suppresses vuetify internal TypeError, tests pass regardless
  console.log = jest.fn()

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(TitleBar, opts) : shallowMount(TitleBar, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const title = 'TITLE NAME'

  it('renders title from props', () => {
    const wrapper = factory({
      propsData: { title },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  // it('does not show option buttons and their tooltips by default', () => {
  //   const wrapper = factory({
  //     localVue
  //   }, true)

  //   // only one button that is the trigger itself
  //   expect(wrapper.findAll('.v-speed-dial .v-btn').length).toBe(1)
  //   expect(wrapper.findAll('.v-tooltip').length).toBe(0)
  // })

  // it('shows option buttons with tooltips when trigger button is clicked', () => {
  //   const wrapper = factory({
  //     localVue
  //   }, true)

  //   const triggerBtn = wrapper.find('.v-speed-dial .v-btn')
  //   triggerBtn.trigger('click')
  //   expect(wrapper.findAll('.v-speed-dial .v-btn').length).toBe(3)
  //   expect(wrapper.findAll('.v-tooltip').length).toBe(2)
  // })

  // it('emits "tb:create-list" when its respective button is clicked', () => {
  //   const wrapper = factory({
  //     localVue
  //   }, true)

  //   const triggerBtn = wrapper.find('.v-speed-dial .v-btn')
  //   triggerBtn.trigger('click')

  //   const createListBtn = wrapper.findAll('.v-speed-dial .v-btn').at(1)
  //   createListBtn.trigger('click')

  //   const emitObj = wrapper.emitted('tb:create-list')
  //   expect(emitObj[0][0]).toBeInstanceOf(Event)
  // })

  // it('emits "tb:create-board" when its respective button is clicked', () => {
  //   const wrapper = factory({
  //     localVue
  //   }, true)

  //   const triggerBtn = wrapper.find('.v-speed-dial .v-btn')
  //   triggerBtn.trigger('click')

  //   const createListBtn = wrapper.findAll('.v-speed-dial .v-btn').at(2)
  //   createListBtn.trigger('click')

  //   const emitObj = wrapper.emitted('tb:create-board')
  //   expect(emitObj[0][0]).toBeInstanceOf(Event)
  // })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue,
      propsData: { title }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  // it('should match snapshot when trigger button is clicked', () => {
  //   const wrapper = factory({
  //     localVue,
  //     propsData: { title }
  //   }, true)

  //   wrapper.find('.v-speed-dial .v-btn').trigger('click')
  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
