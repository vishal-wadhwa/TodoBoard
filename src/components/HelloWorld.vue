<template>
  <v-container>
    <v-layout text-xs wrap>
      <v-flex>
        <!-- <list-item-form></list-item-form> -->
        <!-- <base-list-item title='Hello' :desc='txt' :tags='tags' view='new'></base-list-item> -->
        <base-list highlightColor='red' header='My first todo' :list='list' @bl:add='onAdd'>
          <!-- <template slot='header'>IOIO</template> -->
          <template slot='new-item'>
            <v-layout v-show='state === "normal"' justify-center>
              <v-btn fab dark color='red' small @click='onAdd'>
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-layout>
            <v-slide-y-transition>
              <list-item-form
                v-show='state === "add"'
                :tags='["A", "B"]'
                @lif:save='onSave'
                @lif:discard='state = "normal"'
              ></list-item-form>
            </v-slide-y-transition>
          </template>
        </base-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import BaseListItem from './BaseList/BaseListItem'
import BaseList from './BaseList/BaseList'
import ListItemForm from './ListItemForm'
import { randomData } from '../utils/random_data'

export default {
  components: { BaseList, ListItemForm },
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
      }),
      state: 'normal' // ['add', 'normal']
    }
  },
  created () {
    console.log(this.$data)
  },
  methods: {
    onAdd (ev) {
      this.state = 'add'
      // let ob = randomData({
      //   title: String,
      //   desc: {
      //     _type: Array,
      //     _len: 10,
      //     _valType: String
      //   },
      //   tags: {
      //     _type: Array,
      //     _len: 2,
      //     _valType: String
      //   }
      // })
      // ob['desc'] = ob['desc'].join(' ')
      // ob['_id'] = Math.random() * 100 >> 0
      // this.list.push(ob)
    },
    onSave (data, ev) {
      this.state = 'normal'
      const ob = {
        ...data,
        _id: Math.random() * 100 >> 0
      }
      this.list.push(ob)
    }
  }
}
</script>

<style>
</style>
