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
      bItems: [
        {
          _id: 'lst-1',
          highlightColor: '#abcdef',
          header: 'List1',
          tags: ['haha', 'llssd'],
          list: [
            {
              _id: 'lst-1:it-1',
              title: 'sanmu',
              desc: 'oh cunihnon vocew lab sirrufoka loj ujo utceb lez ej',
              tags: ['fa', 'jebpu'],
              type: 'list'
            },
            {
              title: 'iz',
              desc: 'vuha ogpufub in jufwozi mira ep po gozseic burni zictam',
              tags: ['sikgaok', 'co'],
              _id: 'lst-1:it-2',
              type: 'playlist_play'
            }
          ]
        },
        {
          _id: 'lst-2',
          highlightColor: '#12cdef',
          header: 'List2',
          tags: ['11haha', '22llssd'],
          list: [
            {
              _id: 'lst-2:it-1',
              title: 'sanmu',
              desc: 'oh cunihnon vocew lab sirrufoka loj ujo utceb lez ej',
              tags: ['fa', 'jebpu'],
              type: 'list'
            },
            {
              title: 'iz',
              desc: 'vuha ogpufub in jufwozi mira ep po gozseic burni zictam',
              tags: ['sikgaok', 'co'],
              _id: 'lst-2:it-2',
              type: 'playlist_play'
            }
          ]
        },
        {
          _id: 'lst-3',
          highlightColor: '#a122ef',
          header: 'List3',
          tags: ['3haha', '33llssd'],
          list: [
            {
              _id: 'lst-3:it-1',
              title: 'duzjukve',
              desc: 'giv howseb ikopir lo vehladdih delolir uj dafassu joig mocun',
              tags: ['magew', 'wobsudig']
            }
          ]
        }
      ]
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
