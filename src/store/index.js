import Vue from 'vue'
import Vuex from 'vuex'

import board from './board'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    drawer: true,
    boardForm: false,
    listForm: false
  },
  getters: {

  },
  mutations: {
    setDrawerState (state, val) {
      state.drawer = val
    },
    setBoardFormState (state, val) {
      state.boardForm = val
    },
    setListFormState (state, val) {
      state.listForm = val
    }
  },
  actions: {

  },
  modules: {
    board
  }
})
