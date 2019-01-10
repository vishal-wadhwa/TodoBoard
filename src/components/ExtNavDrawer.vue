<template>
  <v-navigation-drawer
    :value='state'
    @input='val => $emit("end:change", val)'
    fixed
    clipped
    app
    class='pa-2'
    width='280'
  >
    <v-layout column>
      <v-flex class='text-xs-center'>
        <v-avatar size='200'>
          <img src='https://picsum.photos/300/?random' class='img-avatar--border'>
        </v-avatar>
      </v-flex>
      <v-list :subheader='true' dense>
        <v-list-tile>
          <v-subheader class='mt-3'>Boards</v-subheader>
        </v-list-tile>

        <v-list-tile
          avatar
          v-for='board in boardList'
          :key='board._id'
          :to='{name: "home", params: {"boardId": board._id}}'
          @click='ev => $emit("end:board-click", board, ev)'
        >
          <v-list-tile-avatar>
            <v-icon>chrome_reader_mode</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title v-text='board.boardName'></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>
<script>
export default {
  model: {
    prop: 'state',
    event: 'end:change'
  },
  props: {
    state: {
      type: Boolean,
      default: true
    },
    boardList: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="stylus" scoped>
.img-avatar {
  &--border {
    border: 2px solid black;
  }
}
</style>
