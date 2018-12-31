<template>
  <v-container fluid>
    <slot name='bname'>
      <div class='headline'>{{boardName}}</div>
    </slot>
    <v-layout wrap>
      <v-flex
        v-for='(slicedBoardItem, i) in slicedBoardItems'
        :key='"lg4-md6-xs12--" + i'
        lg4
        md6
        xs12
      >
        <v-layout column>
          <base-list
            v-for='boardItem in slicedBoardItem'
            :key='boardItem._id'
            :highlightColor='boardItem.highlightColor'
            :header='boardItem.header'
            :list='boardItem.list'
          >
            <template slot='new-item'>
              <v-layout v-show='boardItem._state === STATE_ITEM_NORMAL' justify-center>
                <v-btn
                  fab
                  dark
                  :color='boardItem.highlightColor'
                  small
                  @click='ev => onAddClick(boardItem._id, ev)'
                >
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-layout>
              <v-slide-y-transition>
                <list-item-form
                  v-show='boardItem._state === STATE_ITEM_ADD'
                  :tags='boardItem.tags || []'
                  @lif:save='(data, ev) => onSaveItem(boardItem._id, data, ev)'
                  @lif:discard='boardItem._state = STATE_ITEM_NORMAL'
                ></list-item-form>
              </v-slide-y-transition>
            </template>
          </base-list>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import BaseList from './BaseList/BaseList'
import ListItemForm from './ListItemForm'

const STATE_ITEM_ADD = 'add'
const STATE_ITEM_NORMAL = 'normal'

export default {
  components: { BaseList, ListItemForm },
  data () {
    return {
      STATE_ITEM_ADD,
      STATE_ITEM_NORMAL,
      LIST_COLS: 3,
      boardItems: []
    }
  },
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    boardName: {
      type: String,
      default: 'New Board'
    }
  },
  methods: {
    onAddClick (itemId, ev) {
      console.log(itemId)
      this.boardItems.find(bi => bi._id === itemId)._state = STATE_ITEM_ADD
    },
    onSaveItem (itemId, data, ev) {
      let bItem = this.boardItems.find(bi => bi._id === itemId)
      bItem._state = STATE_ITEM_NORMAL
      const ob = {
        ...data,
        _id: 'li-' + (Math.random() * 144000 >> 0),
        type: bItem['type']
      }
      bItem.list.push(ob)
    }
  },
  computed: {
    slicedBoardItems () {
      let nlist = Array.from({ length: this.LIST_COLS }, () => [])
      console.log(this.boardItems)
      for (let i = 0; i < this.boardItems.length; ++i) {
        nlist[i % this.LIST_COLS].push(this.boardItems[i])
      }
      console.log(nlist)

      return nlist
    }
  },
  created () {
    this.boardItems = this.lists.map(listItem => ({ ...listItem, _state: this.STATE_ITEM_NORMAL }))
  },
  watch: {
    lists (newl, oldl) {
      this.boardItems = newl.map(listItem => ({ ...listItem, _state: this.STATE_ITEM_NORMAL }))
    }
  }
}
</script>
