import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ListForm from '@/components/ListForm'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

// add v-model unit tests
describe('ListForm.vue', () => {
  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(ListForm, opts) : shallowMount(ListForm, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const formHeading = 'Add new list'

  it('renders default form heading', () => {
    const wrapper = factory({
      localVue,
      sync: false // avoids vue warnings: https://github.com/vuejs/vue-test-utils/issues/532
    }, true) // full mount required otherwise $refs is not populated
    expect(wrapper.text()).toMatch(ListForm.props.formHeading.default)
  })

  it('renders form heading from props', () => {
    const wrapper = factory({
      propsData: { formHeading },
      localVue,
      sync: false
    }, true)
    expect(wrapper.text()).not.toMatch(ListForm.props.formHeading.default)
    expect(wrapper.text()).toMatch(formHeading)
  })

  it('emits "lf:discard" when discard button is clicked', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    const discardBtn = wrapper.find('button.error')
    discardBtn.trigger('click')

    const emitObj = wrapper.emitted('lf:discard')
    expect(emitObj).toBeTruthy()
  })

  it('does not emit "lf:save" on clicking when header field is empty or space-only string', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    wrapper.setData({ header: '   ' })
    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lf:save')
    expect(emitObj).toBeUndefined()
  })

  it('emits trimmed string in header field', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    const header = 'Todos for the day'

    wrapper.setData({ header: `\n\t   ${header}   \n\t` })

    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lf:save')[0][0]
    expect(emitObj['header']).toEqual(header)
  })

  it('emits "lf:save" on clicking save button', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    const data = {
      header: 'Todos for the day',
      highlightColor: '#f44336',
      type: 'add'
    }

    wrapper.setData({ ...data })

    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lf:save')[0][0]
    expect(emitObj).toEqual(data)
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      sync: false
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
