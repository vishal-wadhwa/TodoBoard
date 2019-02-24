<template>
  <v-container fluid>
    <board
      :lists='boardLists'
      :board-name='boardName'
      @b:new-list-item='onListItemCreate'
      class='pa-0'
    ></board>
    <v-speed-dial v-model='fab' fixed right bottom>
      <v-btn v-model='fab' slot='activator' color='blue darken-2' fab dark>
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip left :value='true' nudge-left='20' :close-delay='365*24*60*60*1000'>
        <v-btn
          fab
          dark
          small
          color='green darken-2'
          slot='activator'
          @click='listForm = true; $refs["listForm"] && $nextTick($refs["listForm"].focus)'
        >
          <v-icon>playlist_add</v-icon>
        </v-btn>Create new list
      </v-tooltip>
      <v-tooltip left :value='true' nudge-left='20' :close-delay='365*24*60*60*1000'>
        <v-btn
          fab
          dark
          small
          color='orange darken-2'
          slot='activator'
          @click='boardForm = drawer = true'
        >
          <v-icon>dashboard</v-icon>
        </v-btn>Create new board
      </v-tooltip>
    </v-speed-dial>
    <v-dialog max-width='800px' lazy v-model='listForm'>
      <list-form @lf:save='onListCreate' @lf:discard='listForm = false' ref='listForm'></list-form>
    </v-dialog>
  </v-container>
</template>

<script>
import Board from '../components/Board'
import ListForm from '../components/ListForm'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Board,
    ListForm
  },
  data () {
    return {
      fab: false
    }
  },
  methods: {
    async onListItemCreate (data, ev) {
      await this.createListItem(data)
    },
    async onListCreate (data, ev) {
      this.listForm = false
      await this.createList(data)
    },
    ...mapActions('board', ['createListItem', 'createList'])
  },
  computed: {
    boardName () {
      return this.$store.getters['board/activeBoard'].boardName
    },
    boardLists () {
      return this.$store.getters['board/activeBoard'].lists
    },
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
    }
  },
  async created () {
    await this.$store.dispatch('board/loadBoard', this.$store.getters['board/activeBoardId'])
  }
}
</script>
