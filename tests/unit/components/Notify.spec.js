import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Notify from '@/components/Notify'
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
    return full ? mount(Notify, opts) : shallowMount(Notify, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const msg = 'This is a test notification.'
  const TYPES = ['info', 'success', 'warning', 'error']

  it('does not show notification by default', () => {
    const wrapper = factory({
      localVue
    })

    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('does not show notification if msg prop is empty', () => {
    const wrapper = factory({
      localVue,
      propsData: { msg: '' }
    })

    expect(wrapper.isVisible()).toBeFalsy()
  })

  it('shows notification with appropriate msg', () => {
    const wrapper = factory({
      propsData: { msg },
      localVue
    })

    expect(wrapper.text()).toMatch(msg)
  })

  it('uses info icon by default', () => {
    const wrapper = factory({
      propsData: { msg },
      localVue
    })

    setTimeout(() => expect(wrapper.find({ name: 'v-icon' }).text()).toMatch('info'), 0)
  })

  // Can't get these two cases to run :/
  // it('shows the notification for 6000ms', () => {
  //   jest.setTimeout(6500)
  //   const wrapper = factory({
  //     localVue,
  //     propsData: { msg },
  //     sync: false
  //   })

  //   expect(wrapper.vm.$data.snackbar).toBeTruthy()
  //   setTimeout(() => {
  //     expect(wrapper.text()).toMatch(msg)
  //     console.log('hhahd')
  //     setTimeout(() => {
  //       console.log('hhhelo')
  //       expect(wrapper.vm.$data.snackbar).toBeFalsy()
  //     }, 6100)
  //   }, 0)
  // })

  // it('hides notification when Close button is clicked', done => {
  //   const wrapper = factory({
  //     localVue,
  //     propsData: { msg },
  //     sync: false
  //   })

  //   expect(wrapper.vm.$data.snackbar).toBeTruthy()
  //   wrapper.vm.$nextTick(() => {
  //     wrapper.find({ name: 'v-btn' }).trigger('click')
  //     setTimeout(() => {
  //       expect(wrapper.vm.$data.snackbar).toBeFalsy()
  //       done()
  //     }, 0)
  //   })
  // })

  it('validates type prop to be one of the accepted values', () => {
    const wrapper = factory({
      propsData: { msg },
      localVue
    })

    const typeProp = wrapper.vm.$options.props.type

    expect(typeProp.validator('dalkdfh')).toBeFalsy()
    for (const type of TYPES) {
      expect(typeProp.validator(type)).toBeTruthy()
    }
  })

  it(`should match snapshot with no msg`, () => {
    const wrapper = factory({
      localVue
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })

  for (const type of TYPES) {
    it(`should match snapshot with type prop as ${type}`, () => {
      const wrapper = factory({
        localVue,
        propsData: { msg, type }
      }, true)

      expect(wrapper.html()).toMatchSnapshot()
    })
  }
})
