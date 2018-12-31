import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ListItemForm from '@/components/ListItemForm'
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

describe('ListItemForm.vue', () => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  let localVue = null
  const factory = (opts = {}, full = false) => {
    return full ? mount(ListItemForm, opts) : shallowMount(ListItemForm, opts)
  }
  beforeEach(() => {
    localVue = createLocalVue()
    // localVue.use(Vuetify)
  })

  const tags = ['Categ1', 'Categ2']
  const formHeading = 'Add new entry'

  it('renders default form heading', () => {
    const wrapper = factory({
      localVue
    })
    expect(wrapper.text()).toMatch(ListItemForm.props.formHeading.default)
  })

  it('renders form heading from props', () => {
    const wrapper = factory({
      propsData: { formHeading },
      localVue
    })
    expect(wrapper.text()).not.toMatch(ListItemForm.props.formHeading.default)
    expect(wrapper.text()).toMatch(formHeading)
  })

  it('renders tags', () => {
    const wrapper = factory({
      stubs: ['v-combobox'],
      propsData: { tags },
      localVue
    })
    const comboboxWrapper = wrapper.find('v-combobox-stub')
    expect(comboboxWrapper.attributes('items')).toBe(tags.join(','))
  })

  it('emits "lif:discard" when discard button is clicked', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    const discardBtn = wrapper.find('button.error')
    discardBtn.trigger('click')

    const emitObj = wrapper.emitted('lif:discard')
    expect(emitObj).toBeTruthy()
  })

  it('does not emit "lif:save" on clicking when there is no title', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lif:save')
    expect(emitObj).toBeUndefined()
  })

  it('does not emit "lif:save" when title is empty or space-only string', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    wrapper.setData({ title: '  ' })
    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lif:save')
    expect(emitObj).toBeUndefined()
  })

  it('does not emit "lif:save" when one of the tags is empty or space-only string', () => {
    const wrapper = factory({
      localVue,
      sync: false
    }, true)

    wrapper.setData({ title: 'Note1', tagSelect: ['A', '  '] })
    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lif:save')
    expect(emitObj).toBeUndefined()
  })

  it('emits trimmed strings', () => {
    const wrapper = factory({
      localVue,
      stubs: ['v-text-field'], // suppresses stub issues: https://github.com/vuejs/vue-test-utils/issues/890
      sync: false
    }, true)
    const data = {
      title: 'Note1',
      tags: tags,
      desc: 'CDE'
    }
    wrapper.setData({
      title: '  ' + data['title'] + '   ',
      tagSelect: data['tags'].map(v => '  ' + v + '\n'),
      desc: data['desc'] + '\t\n\v'
    })

    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lif:save')[0][0]
    expect(emitObj).toEqual(data)
  })

  it('emits "lif:save" on clicking save button', () => {
    const wrapper = factory({
      localVue,
      stubs: ['v-text-field'], // suppresses stub issues: https://github.com/vuejs/vue-test-utils/issues/890
      sync: false
    }, true)
    const data = {
      title: 'Note1',
      tags: [],
      desc: ''
    }
    wrapper.setData({ title: data['title'] })
    const saveBtn = wrapper.find('button.success')
    saveBtn.trigger('click')

    const emitObj = wrapper.emitted('lif:save')[0][0]
    expect(emitObj).toEqual(data)
  })

  it('should match snapshot', () => {
    const wrapper = factory({
      propsData: { tags, formHeading },
      sync: false
    }, true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
