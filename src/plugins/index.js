import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import Notify from './Notify'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.use(Notify)
