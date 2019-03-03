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
      <v-list subheader dense>
        <v-list-tile>
          <v-subheader class='mt-3'>Boards</v-subheader>
        </v-list-tile>

        <v-list-tile
          avatar
          active-class='primary lighten-3'
          v-for='board in boardList'
          :key='board._id'
          :to='{name: "home", params: {boardId: board._id}}'
          :title='board.boardName'
          @click='ev => $emit("end:board-click", board._id, ev)'
          @mouseover='$set(deleteBtnVisible, board._id, true)'
          @mouseout='deleteBtnVisible[board._id] = false'
        >
          <v-list-tile-avatar>
            <v-icon>chrome_reader_mode</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title class='font-weight-bold' v-text='board.boardName'></v-list-tile-title>
          <v-btn
            flat
            icon
            small
            title
            v-show='deleteBtnVisible[board._id]'
            @click.prevent.stop='ev => onBoardDelete(board._id, ev)'
          >
            <v-icon small>delete</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
      <v-text-field
        ref='bnameFieldBox'
        v-show='showNewFieldBox'
        clearable
        placeholder='My board'
        class='ml-4 my-0 pa-0 body-1'
        flat
        v-model='newBoardName'
        single-line
        append-outer-icon='check_circle'
        @keydown.enter='onBoardNameSave'
        @keydown.esc='onBoardNameDiscard'
        @click:append-outer='onBoardNameSave'
        @blur='ev => $emit("end:blur", ev)'
        :error-messages='errMsg'
      ></v-text-field>
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
    },
    showNewFieldBox: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newBoardName: '',
      ERROR_MSG: 'Board name can\'t be empty',
      errMsg: '',
      deleteBtnVisible: {}
    }
  },
  methods: {
    onBoardNameSave (ev) {
      if (this.newBoardName.trim().length === 0) {
        this.errMsg = this.ERROR_MSG
        return
      }
      this.$emit('end:bname-save', this.newBoardName.trim(), ev)
      this.newBoardName = ''
    },
    onBoardNameDiscard (ev) {
      this.$emit('end:bname-discard', ev)
      this.newBoardName = ''
      this.errMsg = ''
    },
    onBoardDelete (boardId, ev) {
      delete this.deleteBtnVisible[boardId]
      this.$emit('end:board-delete', boardId, ev)
    }
  },
  watch: {
    showNewFieldBox (val) {
      if (val) {
        this.$nextTick(this.$refs.bnameFieldBox.focus)
      }
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
