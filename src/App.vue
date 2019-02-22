<template>
  <v-app>
    <title-bar
      v-if='$route.fullPath !== "/"'
      title='Todo board'
      @tb:create-list='listForm = true; $refs["listForm"] && $nextTick($refs["listForm"].focus)'
      @tb:create-board='boardForm = true'
    >
      <v-toolbar-side-icon @click='drawer = !drawer' slot='toolbar-icon'>
        <v-icon>{{ drawer ? 'close' : 'menu'}}</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title slot='toolbar-heading'>
        <app-logo color='black' size='2rem'></app-logo>
      </v-toolbar-title>
    </title-bar>
    <ext-nav-drawer
      v-if='$route.fullPath !== "/"'
      v-model='drawer'
      :board-list='boardNames'
      @end:board-click='onBoardChange'
      :show-new-field-box='boardForm'
      @end:bname-discard='boardForm = false'
      @end:bname-save='onBoardCreate'
    ></ext-nav-drawer>
    <v-content>
      <v-dialog max-width='800px' lazy v-model='listForm'>
        <list-form @lf:save='onListCreate' @lf:discard='listForm = false' ref='listForm'></list-form>
      </v-dialog>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import ExtNavDrawer from '@/components/ExtNavDrawer'
import TitleBar from '@/components/TitleBar'
import ListForm from '@/components/ListForm'
import AppLogo from '@/components/AppLogo'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { ExtNavDrawer, TitleBar, ListForm, AppLogo },
  data () {
    return {}
  },
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
    listForm: {
      get () {
        return this.$store.state.listForm
      },
      set (val) {
        this.$store.commit('setListFormState', val)
      }
    },
    ...mapGetters('board', ['boardNames'])
  },
  methods: {
    ...mapActions('board', ['loadBoard', 'createList', 'createBoard']),
    async onBoardChange (board, ev) {
      await this.loadBoard(board._id)
    },
    async onListCreate (data, ev) {
      this.listForm = false
      await this.createList(data)
    },
    async onBoardCreate (boardName, ev) {
      this.boardForm = false
      await this.createBoard({ boardName })
    }
  }
}
</script>
