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

  it('renders title from props', () => {
    const wrapper = factory({
      propsData: { title },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('emits "tb:log-out" when log out button is clicked', () => {
    const wrapper = factory({
      localVue
    }, true)

    const triggerBtn = wrapper.find({ name: 'v-btn' })
    triggerBtn.trigger('click')

    const emitObj = wrapper.emitted('tb:log-out')
    expect(emitObj[0][0]).toBeInstanceOf(Event)
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue,
      propsData: { title }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
