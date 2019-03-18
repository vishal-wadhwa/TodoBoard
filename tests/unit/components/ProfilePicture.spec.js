import { shallowMount, createLocalVue, mount, config } from '@vue/test-utils'
import ProfilePicture from '@/components/ProfilePicture'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

config.logModifiedComponents = false

describe('ProfilePicture.vue', () => {
  // required to vuetify [warn] in snapshot test
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.appendChild(app)

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(ProfilePicture, opts) : shallowMount(ProfilePicture, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const errorConstructor = err => `Error ${err.code}: ${err.body}.`
  const file = { abortLoad: jest.fn(), abortProcessing: jest.fn() }
  const stubs = {
    'file-pond': {
      render (h) { return h('div') },
      methods: {
        removeFile: jest.fn()
      }
    }

  }

  it('has empty imgs data array if no default image is provided', () => {
    const wrapper = factory({
      localVue,
      stubs
    })

    expect(wrapper.vm.imgs).toBeInstanceOf(Array)
    expect(wrapper.vm.imgs.length).toBe(0)
  })

  it('has default image, if provided, loaded into imgs data array', () => {
    const defaultImageSrc = 'random-image'
    const wrapper = factory({
      propsData: { defaultImageSrc },
      localVue,
      stubs
    })

    expect(wrapper.vm.imgs).toBeInstanceOf(Array)
    expect(wrapper.vm.imgs.length).toBe(1)
    expect(wrapper.vm.imgs[0]).toBe(defaultImageSrc)
  })

  it('emits "pp:error"', () => {
    const wrapper = factory({
      localVue,
      stubs
    })

    const err = { body: 'Not found', code: 404 }
    wrapper.vm.onError(err, file)

    const emitArr = wrapper.emitted('pp:error')

    expect(emitArr.length).toBe(1)
    expect(emitArr[0].length).toBe(1)
    expect(emitArr[0][0]).toBe(errorConstructor(err))
  })

  it('emits "pp:warning"', () => {
    const wrapper = factory({
      localVue,
      stubs
    })

    const err = { body: 'Can\'t load', code: 400 }
    wrapper.vm.onWarning(err, file)

    const emitArr = wrapper.emitted('pp:warning')

    expect(emitArr.length).toBe(1)
    expect(emitArr[0].length).toBe(1)
    expect(emitArr[0][0]).toBe(errorConstructor(err))
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue,
      stubs
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
