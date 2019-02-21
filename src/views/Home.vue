<template>
  <v-container fluid>
    <board :lists='boardLists' :board-name='boardName' @b:new-list-item='onListItemCreate'></board>
  </v-container>
</template>

<script>
import Board from '../components/Board'

export default {
  name: 'Home',
  components: {
    Board
  },
  methods: {
    async onListItemCreate (data, ev) {
      await this.$store.dispatch('board/createListItem', data)
    }
  },
  computed: {
    boardName () {
      return this.$store.getters['board/activeBoard'].boardName
    },
    boardLists () {
      return this.$store.getters['board/activeBoard'].lists
    }
  },
  async created () {
    await this.$store.dispatch('board/loadBoard', this.$store.getters['board/activeBoardId'])
  }
}
</script>
