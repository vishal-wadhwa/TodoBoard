<template>
  <v-container>
    <v-layout text-xs wrap>
      <v-flex>
        <!-- <base-list-item title='Hello' :desc='txt' :tags='tags' view='new'></base-list-item> -->
        <base-list highlightColor='green' header='My first todo' :list='list' @bl:add='onAdd'></base-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import BaseListItem from './BaseList/BaseListItem'
import BaseList from './BaseList/BaseList'
import { randomData } from '../utils/random_data'

export default {
  components: { BaseList },
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
        // nit["view"] = 'full'
        nit['_id'] = Math.random() * 100 >> 0
        return nit
      })
    }
  },
  created () {
    console.log(this.$data)
  },
  methods: {
    onAdd (ev) {
      let ob = randomData({
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
      })
      ob['desc'] = ob['desc'].join(' ')
      ob['_id'] = Math.random() * 100 >> 0
      this.list.push(ob)
    }
  }
}
</script>

<style>
</style>
