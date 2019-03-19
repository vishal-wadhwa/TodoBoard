import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import TitleBar from '@/components/TitleBar'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('TitleBar.vue', () => {
  // required to vuetify [warn] in test
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.appendChild(app)

  // suppresses vuetify internal TypeError, tests pass regardless
  // console.log = jest.fn()

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(TitleBar, opts) : shallowMount(TitleBar, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const title = 'TITLE NAME'
  const fullname = 'John Doe'

  it('renders title from props', () => {
    const wrapper = factory({
      propsData: { title },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('renders fullname from props', () => {
    const wrapper = factory({
      propsData: { fullname },
      localVue
    })
    expect(wrapper.text()).toMatch(fullname)
  })

  it('emits "tb:log-out" when log out button is clicked', () => {
    const wrapper = factory({
      localVue
    }, true)

    const triggerBtn = wrapper.findAll({ name: 'v-btn' }).at(1)
    triggerBtn.trigger('click')

    const emitObj = wrapper.emitted('tb:log-out')
    expect(emitObj[0][0]).toBeInstanceOf(Event)
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue,
      propsData: { title, fullname }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
