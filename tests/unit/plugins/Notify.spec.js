import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Notify from '@/plugins/Notify/Notify'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('Notify.vue', () => {
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

  it('does not show notification if msg is empty', () => {
    const wrapper = factory({
      localVue
    })
    wrapper.vm.notify({ type: 'info', msg: '' })
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('does not show notification if no data is provided', () => {
    const wrapper = factory({
      localVue
    })

    wrapper.vm.notify({ type: 'info', msg: '' })
    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('shows the notification with correct msg and type', async () => {
    const wrapper = factory({
      localVue
    })

    let msg = 'Notif 1'
    let type = 'warning'
    wrapper.vm.notify({ type, msg })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.msg).toEqual(msg)
    expect(wrapper.vm.type).toEqual(type)
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.text()).toMatch(type)
  })

  it('discards the previous notification and shows the new one immediately', async () => {
    const wrapper = factory({
      localVue
    })

    let msg = 'Notif 1'
    let type = 'warning'

    wrapper.vm.notify({ type, msg })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.msg).toEqual(msg)
    expect(wrapper.vm.type).toEqual(type)
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.text()).toMatch(type)

    msg = 'Notif 2'
    type = 'error'

    wrapper.vm.notify({ type, msg })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.msg).toEqual(msg)
    expect(wrapper.vm.type).toEqual(type)
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.text()).toMatch(type)
  })

  it('uses info icon by default', () => {
    const wrapper = factory({
      localVue
    })

    expect(wrapper.find('vicon-stub').text()).toMatch(wrapper.vm.TYPE_TO_ICON['info'])
  })

  it('shows the notification for 6000ms', async () => {
    jest.useFakeTimers()
    const wrapper = factory({
      localVue
    })
    let msg = 'Notif 1'
    let type = 'success'

    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.vm.notify({ type, msg })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBeTruthy()

    jest.runAllTimers()

    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('hides notification when Close button is clicked', async () => {
    const wrapper = factory({
      localVue
    }, true)
    let msg = 'Notif 1'
    let type = 'success'

    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.vm.notify({ type, msg })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper.find({ name: 'v-btn' }).trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isActive).toBeFalsy()
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      localVue
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
