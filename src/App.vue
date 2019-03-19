<template>
  <v-app>
    <title-bar
      v-if='$route.name !== "login"'
      title='Todo board'
      :fullname='$store.getters["login/fullname"]'
      class='primary'
      @tb:log-out='$store.dispatch("login/logout")'
    >
      <v-toolbar-side-icon @click='drawer = !drawer' slot='toolbar-icon'>
        <v-icon color='black'>{{ drawer ? 'close' : 'menu'}}</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title slot='toolbar-heading'>
        <app-logo color='black' size='2rem'></app-logo>
      </v-toolbar-title>
    </title-bar>
    <ext-nav-drawer
      v-if='$route.name !== "login"'
      v-model='drawer'
      :board-list='boardNames'
      :default-image-src='defImgPath'
      :show-new-field-box='boardForm'
      @end:img-error='msg => this.$notify({type: "error", msg})'
      @end:img-warning='msg => this.$notify({type: "warning", msg})'
      @end:board-delete='onBoardDelete'
      @end:bname-discard='boardForm = false'
      @end:blur='boardForm = false'
      @end:bname-save='onBoardCreate'
    ></ext-nav-drawer>
    <v-content>
      <v-progress-linear
        query
        class='ma-0'
        height='4'
        style='position: fixed;'
        :active='active'
        :color='color'
        :indeterminate='indeterminate'
        :value='progressVal'
      ></v-progress-linear>
      <router-view/>
    </v-content>
    <notify bottom auto-height></notify>
  </v-app>
</template>
<script>
import ExtNavDrawer from '@/components/ExtNavDrawer'
import TitleBar from '@/components/TitleBar'
import AppLogo from '@/components/AppLogo'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: { ExtNavDrawer, TitleBar, AppLogo },
  data () {
    return {
      defImgPath: require('./assets/img/avatar.png')
    }
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
    ...mapGetters('board', ['boardNames']),
    ...mapState('progress', ['active', 'progressVal', 'color']),
    ...mapGetters('progress', ['indeterminate'])
  },
  methods: {
    ...mapActions('board', ['createBoard', 'deleteBoard']),
    async onBoardCreate (boardName, ev) {
      this.boardForm = false
      await this.createBoard({ boardName })
    },
    async onBoardDelete (boardId, ev) {
      await this.deleteBoard(boardId)
    }
  }
}
</script>
