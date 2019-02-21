import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import OAuthLoginBtn from '@/components/OAuthLoginBtn'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('OAuthLoginBtn.vue', () => {
  // required to vuetify [warn] in snapshot test
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.appendChild(app)

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(OAuthLoginBtn, opts) : shallowMount(OAuthLoginBtn, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const title = 'Google'
  const iconSrc = 'some_image.jpg'
  const iconBg = 'red'
  const btnBg = 'green'
  const textColor = 'blue'

  it('does not render icon by default', () => {
    const wrapper = factory({
      localVue
    })
    expect(wrapper.find('vavatar-stub').exists()).toBeFalsy()
  })

  it('renders title passed as prop', () => {
    const wrapper = factory({
      propsData: { title },
      localVue
    })
    expect(wrapper.text()).toMatch(title)
  })

  it('has correct iconSrc', () => {
    const wrapper = factory({
      propsData: { iconSrc },
      localVue
    })
    expect(wrapper.find('img').attributes('src')).toMatch(iconSrc)
  })

  it('should match default snapshot', () => {
    const wrapper = factory({
      localVue
    }, true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with props', () => {
    const wrapper = factory({
      localVue,
      propsData: { title, iconSrc, iconBg, btnBg, textColor }
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
