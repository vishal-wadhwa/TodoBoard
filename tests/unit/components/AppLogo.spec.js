import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import AppLogo from '@/components/AppLogo'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('AppLogo.vue', () => {
  // required to vuetify [warn] in snapshot test
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.appendChild(app)

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(AppLogo, opts) : shallowMount(AppLogo, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  it('renders default app name', () => {
    const wrapper = factory({
      localVue
    })
    expect(wrapper.text()).toMatch('TODO Board')
  })

  it('renders shortened app name when "mini" prop is set', () => {
    const wrapper = factory({
      propsData: { mini: true },
      localVue
    })
    expect(wrapper.text()).toMatch('T Board')
  })

  it('should match snapshot with default props', () => {
    const wrapper = factory({
      localVue
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with string size and named color', () => {
    const wrapper = factory({
      localVue,
      propsData: { size: '30rem', color: 'green' }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with integer size and hex color', () => {
    const wrapper = factory({
      localVue,
      propsData: { size: 30, color: '#ABCDEF' }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
