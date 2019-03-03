import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import Notify from './Notify'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#03a9f4',
    secondary: '#000000'
  }
})

Vue.use(Notify)
