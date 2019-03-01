<template>
  <v-app>
    <title-bar
      v-if='$route.name !== "login"'
      title='Todo board'
      @tb:log-out='$store.dispatch("login/logout")'
    >
      <v-toolbar-side-icon @click='drawer = !drawer' slot='toolbar-icon'>
        <v-icon>{{ drawer ? 'close' : 'menu'}}</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title slot='toolbar-heading'>
        <app-logo color='black' size='2rem'></app-logo>
      </v-toolbar-title>
    </title-bar>
    <ext-nav-drawer
      v-if='$route.name !== "login"'
      v-model='drawer'
      :board-list='boardNames'
      @end:board-click='onBoardChange'
      @end:board-delete='onBoardDelete'
      :show-new-field-box='boardForm'
      @end:bname-discard='boardForm = false'
      @end:blur='boardForm = false'
      @end:bname-save='onBoardCreate'
    ></ext-nav-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <notify bottom auto-height></notify>
  </v-app>
</template>

<script>
import ExtNavDrawer from '@/components/ExtNavDrawer'
import TitleBar from '@/components/TitleBar'
import AppLogo from '@/components/AppLogo'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { ExtNavDrawer, TitleBar, AppLogo },
  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawerState', val)
      }
    },
    boardForm: {
      get () {
        return this.$store.state.boardForm
      },
      set (val) {
        this.$store.commit('setBoardFormState', val)
      }
    },
    ...mapGetters('board', ['boardNames'])
  },
  methods: {
    ...mapActions('board', ['loadBoard', 'createBoard', 'deleteBoard']),
    async onBoardChange (board, ev) {
      await this.loadBoard(board._id)
    },
    async onBoardCreate (boardName, ev) {
      this.boardForm = false
      await this.createBoard({ boardName })
    },
    async onBoardDelete (board, ev) {
      await this.deleteBoard(board)
    }
  }
}
</script>
