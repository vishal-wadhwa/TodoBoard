import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    progressVal: 0,
    active: false,
    pId: -1,
    color: 'info'
  },
  getters: {
    indeterminate (state) {
      return state.progressVal === 0
    }
  },
  mutations: {
    initProgress (state, payload) {
      if (!payload.pId) return

      state.pId = payload.pId
      state.color = payload.type || 'info'
      state.active = true
      state.progressVal = 0
    },
    updProgress (state, payload) {
      if (payload.pId !== state.pId) return

      if (payload.progressVal) state.progressVal = payload.progressVal
      if (payload.type) state.color = payload.type

      if (state.progressVal >= 100) {
        Vue.nextTick(() => {
          setTimeout(() => this.commit('progress/resetProgress', { pId: state.pId }), 200)
        })
      }
    },
    resetProgress (state, payload) {
      if (state.pId !== payload.pId) return

      state.active = false
      state.color = 'info'
      state.progressVal = 0
      state.pId = -1
    }
  }
}
