<template>
  <v-container fluid>
    <!-- dialog test -->
    <v-dialog max-width='800px' lazy v-model='state'>
      <v-btn slot='activator' color='primary' dark>Open Dialog</v-btn>

      <list-form @lf:save='onListCreate' @lf:discard='state = false'></list-form>
    </v-dialog>
    <board :lists='bItems'></board>
  </v-container>
</template>

<script>
// import BaseList from '../components/BaseList/BaseList'
// import ListItemForm from '../components/ListItemForm'
import Board from '../components/Board'
import ListForm from '../components/ListForm'
import { randomData } from '../utils/random_data'

export default {
  name: 'Home',
  components: {
    ListForm,
    Board
  },
  data () {
    return {
      list: randomData({
        _type: Array,
        _len: 3,
        _valType: {
          title: String,
          desc: {
            _type: Array,
            _len: 10,
            _valType: String
          },
          tags: {
            _type: Array,
            _len: 2,
            _valType: String
          }
        }
      }).map(it => {
        let nit = { ...it }
        nit['desc'] = nit['desc'].join(' ')
        nit['type'] = ['format_list_bulleted', 'list', 'playlist_play', 'assignment'][Math.random() * 4 >> 0]
        // nit["view"] = 'full'
        nit['_id'] = Math.random() * 100 >> 0
        return nit
      }),
      state: false,
      bItems: []
    }
  },
  created () {
    console.log(this.$data)
  },
  methods: {
    onListCreate (data, ev) {
      this.bItems.push({ ...data, _id: 'bi-' + (Math.random() * 144000 >> 0), list: [] })
      this.state = false
    }
  }
}
</script>
